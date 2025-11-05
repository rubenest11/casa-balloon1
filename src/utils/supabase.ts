
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, folder: string = 'products') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl: string) => {
  try {
    // Extraer el nombre del archivo de la URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const folderName = urlParts[urlParts.length - 2];
    const filePath = `${folderName}/${fileName}`;
    
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
