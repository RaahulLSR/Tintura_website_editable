
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { Plus, Trash2, Edit2, X, Save, Loader2, AlertCircle, PlusCircle, ArrowUp, ArrowDown } from 'lucide-react';

const AdminView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
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
    } catch (err: any) {
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
          if (!ctx) { reject(new Error('Canvas context error')); return; }
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('WebP conversion failed')), 'image/webp', 0.85);
        };
        img.onerror = () => reject(new Error('Image failed to load'));
      };
      reader.onerror = () => reject(new Error('FileReader failed'));
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setErrorMsg(null);
    setLoading(true);
    
    // Ensure we have a valid array for image_urls
    const currentImages = Array.isArray(editingProduct.image_urls) 
      ? editingProduct.image_urls 
      : (editingProduct.image_url ? [editingProduct.image_url] : []);

    const productData: any = {
      style_code: editingProduct.style_code?.toString() || '',
      name: editingProduct.name || 'Unnamed Style',
      category: editingProduct.category || 'CASUALS',
      garment_type: editingProduct.garment_type || 'MENS',
      description: editingProduct.description || '',
      features: Array.isArray(editingProduct.features) ? editingProduct.features : [],
      image_url: currentImages[0] || '', 
      image_urls: currentImages, 
      color: editingProduct.color || '',
      available_sizes: editingProduct.available_sizes || '',
      fabric_type: editingProduct.fabric_type || ''
    };

    try {
      let error;
      if (editingProduct.id) {
        const { error: updateError } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('products').insert([productData]);
        error = insertError;
      }
      
      if (error) {
        if (error.message.includes('image_urls')) {
          throw new Error("The 'image_urls' column is missing in your database. Please run the SQL command provided in the chat instructions.");
        }
        throw error;
      }

      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      setErrorMsg(error.message || "Save failed. Check your database columns.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setErrorMsg(null);
    
    const newUrls: string[] = [...(editingProduct?.image_urls || [])];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const webpBlob = await convertToWebP(file);
        const fileName = `style-${Date.now()}-${i}.webp`;
        
        const { error: uploadError } = await supabase.storage
          .from('Products')
          .upload(fileName, webpBlob, { contentType: 'image/webp' });
          
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('Products').getPublicUrl(fileName);
        newUrls.push(data.publicUrl);
      }
      
      setEditingProduct(prev => ({ ...prev, image_urls: newUrls }));
    } catch (err: any) {
      setErrorMsg(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImageUrl = (index: number) => {
    const newUrls = [...(editingProduct?.image_urls || [])];
    newUrls.splice(index, 1);
    setEditingProduct({ ...editingProduct, image_urls: newUrls });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const urls = [...(editingProduct?.image_urls || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= urls.length) return;
    
    const temp = urls[index];
    urls[index] = urls[targetIndex];
    urls[targetIndex] = temp;
    setEditingProduct({ ...editingProduct, image_urls: urls });
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

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-tintura-black uppercase tracking-tight">Style Inventory</h1>
          <p className="text-gray-500">Manage multi-image collections and performance features.</p>
        </div>
        <button 
          onClick={() => setEditingProduct({ category: 'CASUALS', garment_type: 'MENS', features: [], image_urls: [] })}
          className="bg-tintura-red text-white px-8 py-3 font-bold hover:bg-tintura-black transition-all flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>REGISTER NEW STYLE</span>
        </button>
      </div>

      {errorMsg && (
        <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-grow">
            <p className="text-red-700 text-sm font-black uppercase mb-1">Database Schema Required</p>
            <p className="text-red-600 text-xs leading-relaxed">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="p-1 hover:bg-red-100 rounded-full transition-colors">
            <X className="w-4 h-4 text-red-400" />
          </button>
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
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-10 h-14 bg-gray-100 rounded-sm overflow-hidden border">
                        <img src={p.image_urls?.[0] || p.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-3 font-mono text-sm font-bold text-tintura-red uppercase tracking-tighter">#{p.style_code}</td>
                    <td className="px-6 py-3 font-bold text-gray-800 uppercase">{p.name}</td>
                    <td className="px-6 py-3"><span className="text-[9px] font-black px-2 py-1 bg-gray-100 rounded">{p.garment_type}</span></td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => setEditingProduct(p)} className="p-2 text-gray-400 hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={async () => { if(confirm('Delete style?')) { await supabase.from('products').delete().eq('id', p.id); fetchProducts(); } }} className="p-2 text-gray-400 hover:text-tintura-red"><Trash2 className="w-4 h-4" /></button>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setEditingProduct(null)}></div>
          <div className="relative bg-white w-full max-w-4xl p-8 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh] border-t-8 border-tintura-red">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Style Setup</h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Style Code</label>
                  <input required className="w-full border-b-2 py-2 outline-none focus:border-tintura-red font-mono text-xl" value={editingProduct.style_code || ''} onChange={e => setEditingProduct({...editingProduct, style_code: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Style Name</label>
                  <input required className="w-full border-b-2 py-2 outline-none focus:border-tintura-red text-xl" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1">Target Segment <button type="button" onClick={() => handleAddOption('type')} className="text-tintura-red">+ NEW</button></label>
                   <select className="w-full border-b-2 py-2 outline-none bg-white" value={editingProduct.garment_type} onChange={e => setEditingProduct({...editingProduct, garment_type: e.target.value})}>
                    {garmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                </div>
                <div>
                   <label className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-1">Category <button type="button" onClick={() => handleAddOption('category')} className="text-tintura-red">+ NEW</button></label>
                   <select className="w-full border-b-2 py-2 outline-none bg-white" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-3">Style Gallery (Upload Multiple & Reorder)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6">
                  {editingProduct.image_urls?.map((url, idx) => (
                    <div key={idx} className="relative group aspect-[3/4] bg-gray-100 border rounded-sm overflow-hidden">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <div className="flex space-x-1">
                          <button type="button" onClick={() => moveImage(idx, 'up')} className="bg-white/90 p-1.5 rounded-full hover:bg-white"><ArrowUp className="w-3 h-3" /></button>
                          <button type="button" onClick={() => moveImage(idx, 'down')} className="bg-white/90 p-1.5 rounded-full hover:bg-white"><ArrowDown className="w-3 h-3" /></button>
                        </div>
                        <button type="button" onClick={() => removeImageUrl(idx)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="absolute bottom-1 left-1 bg-tintura-black text-white text-[9px] px-1.5 py-0.5 font-black uppercase">
                        Pos: {idx + 1} {idx === 0 && "(Cover)"}
                      </div>
                    </div>
                  ))}
                  <label className="aspect-[3/4] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <PlusCircle className="w-8 h-8 text-gray-300" />
                    <span className="text-[10px] font-black uppercase text-gray-400 mt-2">Add Images</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <input placeholder="Colors" className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.color || ''} onChange={e => setEditingProduct({...editingProduct, color: e.target.value})} />
                <input placeholder="Sizes" className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.available_sizes || ''} onChange={e => setEditingProduct({...editingProduct, available_sizes: e.target.value})} />
                <input placeholder="Fabric" className="w-full border-b-2 py-2 outline-none focus:border-tintura-red" value={editingProduct.fabric_type || ''} onChange={e => setEditingProduct({...editingProduct, fabric_type: e.target.value})} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Technical Features</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {editingProduct.features?.map((f, i) => (
                    <span key={i} className="bg-gray-100 text-[10px] font-bold px-2 py-1 flex items-center space-x-1">
                      <span>{f}</span>
                      <button type="button" onClick={() => { const feats = [...(editingProduct.features || [])]; feats.splice(i,1); setEditingProduct({...editingProduct, features: feats}) }} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input className="flex-grow border-b-2 py-2 outline-none text-sm" placeholder="Add feature..." value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), setNewFeature(''), setEditingProduct({...editingProduct, features: [...(editingProduct.features || []), newFeature.trim()]}))} />
                  <button type="button" onClick={() => { if(newFeature) { setEditingProduct({...editingProduct, features: [...(editingProduct.features || []), newFeature.trim()]}); setNewFeature(''); } }} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><PlusCircle className="w-5 h-5 text-tintura-red" /></button>
                </div>
              </div>

              <textarea className="w-full border-2 p-3 text-sm h-24 outline-none focus:border-tintura-red rounded-sm resize-none" placeholder="Description..." value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />

              <button disabled={loading || uploading || !(editingProduct.image_urls?.length || editingProduct.image_url)} type="submit" className="w-full bg-tintura-red text-white py-4 font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-2 shadow-xl disabled:opacity-50">
                {uploading ? <Loader2 className="animate-spin" /> : <Save />}
                <span>{editingProduct.id ? 'UPDATE STYLE DATA' : 'FINALIZE & SAVE STYLE'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
