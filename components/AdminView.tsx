
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category, GarmentType } from '../types';
import { Plus, Trash2, Edit2, Upload, X, Save, FileText, Loader2, AlertCircle, CheckCircle2, Database } from 'lucide-react';
import Papa from 'papaparse';

const AdminView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    checkConnection();
    fetchProducts();
  }, []);

  const checkConnection = async () => {
    try {
      const { error } = await supabase.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      setDbStatus('connected');
    } catch (err) {
      console.error('Connection check failed:', err);
      setDbStatus('error');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching:', error);
      setErrorMsg(`Failed to fetch styles: ${error.message}`);
    } else {
      setProducts(data || []);
      setErrorMsg(null);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setLoading(true);
    
    // SANITIZE DATA: Strictly only send columns that exist in your DB table
    // Removing any virtual fields like 'id' (if new) or 'isNew'
    const productData: any = {
      style_code: editingProduct.style_code?.toString() || '',
      name: editingProduct.name || 'Unnamed Style',
      category: editingProduct.category || Category.CASUALS,
      garment_type: editingProduct.garment_type || 'MENS',
      description: editingProduct.description || '',
      features: Array.isArray(editingProduct.features) ? editingProduct.features : [],
      image_url: editingProduct.image_url || '',
      color: editingProduct.color || ''
    };

    let error;
    if (editingProduct.id) {
      const { error: err } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from('products')
        .insert([productData]);
      error = err;
    }

    if (error) {
      console.error('Save error:', error);
      setErrorMsg(`Database Error: ${error.message}. Please check your RLS policies.`);
    } else {
      setEditingProduct(null);
      fetchProducts();
      setErrorMsg(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this style?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert(`Delete error: ${error.message}`);
    else fetchProducts();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg(null);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('Products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('Products').getPublicUrl(filePath);
      setEditingProduct(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: any) {
      console.error('Upload catch:', err);
      setErrorMsg(`Upload failed: ${err.message}. Ensure your 'Products' bucket is public and RLS is set.`);
    } finally {
      setUploading(false);
    }
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        setLoading(true);
        const transformedData = results.data.map((row: any) => ({
          style_code: (row.style_code || row.StyleCode || 'N/A').toString(),
          name: row.name || row.Name || 'Unnamed',
          category: row.category || row.Category || 'CASUALS',
          garment_type: row.garment_type || row.Type || 'MENS',
          description: row.description || '',
          color: row.color || '',
          image_url: row.image_url || '',
          features: row.features ? row.features.split(',').map((f: string) => f.trim()) : []
        }));

        const { error } = await supabase.from('products').insert(transformedData);
        if (error) {
          setErrorMsg(`CSV Import Error: ${error.message}`);
        } else {
          fetchProducts();
          setErrorMsg(null);
        }
        setLoading(false);
      }
    });
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-4xl font-display font-bold text-tintura-black uppercase tracking-tight">Database Control</h1>
            {dbStatus === 'connected' ? (
              <div className="flex items-center space-x-1 bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-green-200">
                <CheckCircle2 className="w-3 h-3" />
                <span>Sync Active</span>
              </div>
            ) : dbStatus === 'error' ? (
              <div className="flex items-center space-x-1 bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-red-200">
                <Database className="w-3 h-3" />
                <span>Policy Restricted</span>
              </div>
            ) : null}
          </div>
          <p className="text-gray-500">Manage Tintura styles and bulk inventory uploads.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <label className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-gray-100 px-6 py-3 font-bold cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
            <FileText className="w-5 h-5" />
            <span>BULK CSV</span>
            <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
          </label>
          <button 
            onClick={() => {
              setErrorMsg(null);
              setEditingProduct({ category: Category.CASUALS, garment_type: 'MENS', features: [] });
            }}
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-tintura-red text-white px-6 py-3 font-bold hover:bg-tintura-black transition-all shadow-lg hover:shadow-tintura-red/20"
          >
            <Plus className="w-5 h-5" />
            <span>ADD STYLE</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 flex items-start space-x-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <p className="text-red-700 font-bold text-sm uppercase tracking-wider mb-1">Security Policy Violation</p>
            <p className="text-red-600 text-sm leading-relaxed">{errorMsg}</p>
            <div className="mt-3 p-2 bg-white/50 rounded text-[10px] font-mono text-red-800">
              Tip: Run the RLS SQL scripts in your Supabase Dashboard to enable 'anon' write access.
            </div>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading && !editingProduct ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-tintura-red" />
          <p className="font-display font-bold text-gray-400 tracking-widest">SYNCHRONIZING DATABASE...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden rounded-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-tintura-black text-white uppercase text-xs font-display tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-5">Preview</th>
                  <th className="px-6 py-5">Code</th>
                  <th className="px-6 py-5">Style Name</th>
                  <th className="px-6 py-5">Category</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-display italic">
                      No styles in database. Click "Add Style" to begin.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <img 
                          src={p.image_url || 'https://via.placeholder.com/150x200?text=NO+IMAGE'} 
                          alt="" 
                          className="w-12 h-16 object-cover bg-gray-100 rounded-sm border border-gray-200" 
                        />
                      </td>
                      <td className="px-6 py-4 font-bold font-mono text-gray-600">#{p.style_code}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{p.name}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] px-2.5 py-1 bg-gray-100 text-gray-600 font-black rounded uppercase tracking-wider">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button 
                          onClick={() => {
                            setErrorMsg(null);
                            setEditingProduct(p);
                          }} 
                          className="p-2.5 text-gray-400 hover:text-tintura-accent hover:bg-blue-50 transition-all rounded-full"
                          title="Edit Style"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          className="p-2.5 text-gray-400 hover:text-tintura-red hover:bg-red-50 transition-all rounded-full"
                          title="Delete Style"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-tintura-black/80 backdrop-blur-md" onClick={() => setEditingProduct(null)}></div>
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl rounded-sm">
            <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight">
                {editingProduct.id ? 'Edit Style' : 'Create New Style'}
              </h2>
              <button 
                onClick={() => setEditingProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-tintura-red mb-2">Style Code *</label>
                  <input 
                    required
                    placeholder="e.g. 1004"
                    className="w-full border-b-2 border-gray-200 py-3 px-1 focus:border-tintura-black outline-none transition-colors font-mono"
                    value={editingProduct.style_code || ''} 
                    onChange={e => setEditingProduct({...editingProduct, style_code: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-tintura-red mb-2">Display Name *</label>
                  <input 
                    required
                    placeholder="e.g. T-Shirts Printed"
                    className="w-full border-b-2 border-gray-200 py-3 px-1 focus:border-tintura-black outline-none transition-colors"
                    value={editingProduct.name || ''} 
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-tintura-red mb-2">Fabric Category</label>
                  <select 
                    className="w-full border-b-2 border-gray-200 py-3 bg-transparent outline-none focus:border-tintura-black"
                    value={editingProduct.category} 
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value as Category})}
                  >
                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-tintura-red mb-2">Garment Type</label>
                  <select 
                    className="w-full border-b-2 border-gray-200 py-3 bg-transparent outline-none focus:border-tintura-black"
                    value={editingProduct.garment_type} 
                    onChange={e => setEditingProduct({...editingProduct, garment_type: e.target.value as GarmentType})}
                  >
                    <option value="MENS">MENS</option>
                    <option value="BOYS">BOYS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-tintura-red mb-2">Description</label>
                <textarea 
                  placeholder="Describe the fabric, wash and fit details..."
                  className="w-full border-b-2 border-gray-200 py-3 px-1 outline-none focus:border-tintura-black h-24 resize-none"
                  value={editingProduct.description || ''} 
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-tintura-red mb-2">Cover Image</label>
                <div className="mt-2 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="w-24 h-32 bg-gray-100 border border-gray-200 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {editingProduct.image_url ? (
                      <img src={editingProduct.image_url} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <Upload className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-grow w-full">
                    <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-200 p-6 cursor-pointer hover:bg-gray-50 transition-all rounded hover:border-tintura-black group">
                      {uploading ? (
                        <div className="flex items-center space-x-3">
                          <Loader2 className="w-5 h-5 animate-spin text-tintura-red" />
                          <span className="font-bold text-gray-500">UPLOADING TO CLOUD...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3 text-gray-500 group-hover:text-tintura-black">
                          <Upload className="w-5 h-5" />
                          <span className="font-bold uppercase tracking-widest text-xs">
                            {editingProduct.image_url ? 'Replace Image' : 'Select Cover File'}
                          </span>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    <p className="text-[10px] text-gray-400 mt-2">Recommended: .webp or .jpg (3:4 aspect ratio)</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  disabled={loading || uploading}
                  type="submit" 
                  className="w-full bg-tintura-black text-white font-bold py-5 hover:bg-tintura-red transition-all flex items-center justify-center space-x-3 shadow-xl hover:shadow-tintura-red/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  )}
                  <span className="text-lg tracking-widest">
                    {editingProduct.id ? 'UPDATE STYLE' : 'SAVE TO DATABASE'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
