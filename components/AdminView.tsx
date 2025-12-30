
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { Plus, Trash2, Edit2, X, Save, Loader2, AlertCircle, Image as ImageIcon, PlusCircle } from 'lucide-react';

const AdminView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // State for dynamic options
  const [categories, setCategories] = useState<string[]>(['CASUALS', 'LITE', 'SPORTZ']);
  const [garmentTypes, setGarmentTypes] = useState<string[]>(['MENS', 'BOYS']);
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProducts(data || []);
      
      if (data) {
        const uniqueCats = Array.from(new Set([...['CASUALS', 'LITE', 'SPORTZ'], ...data.map(p => p.category)]));
        const uniqueTypes = Array.from(new Set([...['MENS', 'BOYS'], ...data.map(p => p.garment_type)]));
        setCategories(uniqueCats);
        setGarmentTypes(uniqueTypes);
      }
      setErrorMsg(null);
    } catch (err: any) {
      console.error('Error fetching:', err);
      setErrorMsg(`Failed to fetch styles: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const convertToWebP = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_HEIGHT = 1600;
          let width = img.width;
          let height = img.height;
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) { reject(new Error('Canvas error')); return; }
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('WebP conversion failed')), 'image/webp', 0.85);
        };
        img.onerror = () => reject(new Error('Load error'));
      };
      reader.onerror = () => reject(new Error('Read error'));
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setLoading(true);
    const productData: any = {
      style_code: editingProduct.style_code?.toString() || '',
      name: editingProduct.name || 'Unnamed Style',
      category: editingProduct.category || 'CASUALS',
      garment_type: editingProduct.garment_type || 'MENS',
      description: editingProduct.description || '',
      features: Array.isArray(editingProduct.features) ? editingProduct.features : [],
      image_url: editingProduct.image_url || '',
      color: editingProduct.color || '',
      available_sizes: editingProduct.available_sizes || '',
      fabric_type: editingProduct.fabric_type || ''
    };

    try {
      if (editingProduct.id) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      setErrorMsg(`Database Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOption = (type: 'category' | 'type') => {
    const val = prompt(`Enter new ${type} name:`);
    if (!val) return;
    const upperVal = val.toUpperCase().trim();
    if (type === 'category') {
      if (!categories.includes(upperVal)) setCategories([...categories, upperVal]);
      setEditingProduct(prev => ({ ...prev, category: upperVal }));
    } else {
      if (!garmentTypes.includes(upperVal)) setGarmentTypes([...garmentTypes, upperVal]);
      setEditingProduct(prev => ({ ...prev, garment_type: upperVal }));
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const currentFeatures = editingProduct?.features || [];
    if (!currentFeatures.includes(newFeature.trim())) {
      setEditingProduct({ ...editingProduct, features: [...currentFeatures, newFeature.trim()] });
    }
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    const currentFeatures = [...(editingProduct?.features || [])];
    currentFeatures.splice(index, 1);
    setEditingProduct({ ...editingProduct, features: currentFeatures });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const webpBlob = await convertToWebP(file);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
      const filePath = `covers/${fileName}`;
      const { error } = await supabase.storage.from('Products').upload(filePath, webpBlob, { contentType: 'image/webp' });
      if (error) throw error;
      const { data } = supabase.storage.from('Products').getPublicUrl(filePath);
      setEditingProduct(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: any) {
      setErrorMsg(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-tintura-black uppercase tracking-tight">Style Inventory</h1>
          <p className="text-gray-500">Row-wise database management for collections.</p>
        </div>
        <button 
          onClick={() => setEditingProduct({ category: 'CASUALS', garment_type: 'MENS', features: [] })}
          className="bg-tintura-red text-white px-8 py-3 font-bold hover:bg-tintura-black transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>CREATE NEW STYLE</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <p className="text-red-700 text-sm">{errorMsg}</p>
          <button onClick={() => setErrorMsg(null)} className="ml-auto"><X className="w-4 h-4 text-red-400" /></button>
        </div>
      )}

      <div className="bg-white border-2 border-gray-100 overflow-hidden shadow-sm">
        {loading && products.length === 0 ? (
          <div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-tintura-red" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Target</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-10 h-14 bg-gray-100 rounded-sm overflow-hidden border">
                        <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-3 font-mono text-xs font-bold text-tintura-red">#{p.style_code}</td>
                    <td className="px-6 py-3 font-bold text-gray-800">{p.name}</td>
                    <td className="px-6 py-3">
                      <span className={`text-[9px] font-black px-2 py-1 rounded ${p.garment_type === 'BOYS' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {p.garment_type}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-[9px] border-2 border-gray-100 text-gray-500 px-2 py-0.5 rounded font-black">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => setEditingProduct(p)} className="p-2 text-gray-400 hover:text-tintura-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={async () => { if(confirm('Delete this style permanently?')) { await supabase.from('products').delete().eq('id', p.id); fetchProducts(); }}} className="p-2 text-gray-400 hover:text-tintura-red transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setEditingProduct(null)}></div>
          <div className="relative bg-white w-full max-w-3xl p-8 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh] border-t-8 border-tintura-red">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                {editingProduct.id ? 'Edit Style Details' : 'Register New Style'}
              </h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Unique Style Code</label>
                  <input required className="w-full border-b-2 py-2 outline-none focus:border-tintura-red font-mono" value={editingProduct.style_code || ''} onChange={e => setEditingProduct({...editingProduct, style_code: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Display Name</label>
                  <input required className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1">
                    <span>Target Segment</span>
                    <button type="button" onClick={() => handleAddOption('type')} className="text-tintura-red hover:underline">+ NEW</button>
                  </label>
                  <select className="w-full border-b-2 py-2 outline-none bg-white" value={editingProduct.garment_type} onChange={e => setEditingProduct({...editingProduct, garment_type: e.target.value})}>
                    {garmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1">
                    <span>Collection Category</span>
                    <button type="button" onClick={() => handleAddOption('category')} className="text-tintura-red hover:underline">+ NEW</button>
                  </label>
                  <select className="w-full border-b-2 py-2 outline-none bg-white" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Colors</label>
                  <input placeholder="Red, Black" className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.color || ''} onChange={e => setEditingProduct({...editingProduct, color: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Sizes</label>
                  <input placeholder="S-XL" className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.available_sizes || ''} onChange={e => setEditingProduct({...editingProduct, available_sizes: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Fabric</label>
                  <input placeholder="BioWash Cotton" className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.fabric_type || ''} onChange={e => setEditingProduct({...editingProduct, fabric_type: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Technical Features</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {editingProduct.features?.map((f, i) => (
                    <span key={i} className="bg-gray-100 text-[10px] font-bold px-2 py-1 rounded-sm flex items-center space-x-1">
                      <span>{f}</span>
                      <button type="button" onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input className="flex-grow border-b-2 py-2 outline-none text-sm" placeholder="Add a performance feature..." value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                  <button type="button" onClick={addFeature} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><PlusCircle className="w-5 h-5 text-tintura-red" /></button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Description</label>
                <textarea className="w-full border-2 p-3 text-sm h-24 outline-none focus:border-tintura-red rounded-sm resize-none" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Style Visual (WebP optimized)</label>
                <div className="flex items-center space-x-4 border-2 border-dashed border-gray-200 p-6 rounded-sm bg-gray-50">
                  {editingProduct.image_url ? (
                    <div className="w-16 h-20 bg-white border p-1"><img src={editingProduct.image_url} alt="" className="w-full h-full object-cover" /></div>
                  ) : (
                    <div className="w-16 h-20 bg-white flex items-center justify-center border-2 border-dashed border-gray-300"><ImageIcon className="text-gray-300" /></div>
                  )}
                  <div className="flex-grow">
                    <label className="cursor-pointer bg-tintura-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-tintura-red transition-all inline-block shadow-md">
                      {uploading ? 'Processing Image...' : 'Select File'}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase">PNG, JPG or WEBP supported.</p>
                  </div>
                </div>
              </div>

              <button disabled={loading || uploading} type="submit" className="w-full bg-tintura-red text-white py-4 font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xl disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" /> : <Save />}
                <span>{editingProduct.id ? 'UPDATE DATABASE RECORD' : 'COMMIT TO DATABASE'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
