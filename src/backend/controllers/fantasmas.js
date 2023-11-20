import { supabase } from "../client";

export const getFantasmas = async () => {

    let { data: Fantasmas, error } = await supabase
        .from('Fantasmas')
        .select('*');
        
    return Fantasmas;

}


export const getFantasmasById = async (id)=>{
    let {data: Fantasma , error} = await supabase
    .from('Fantasmas')
    .select('*')
    .eq('id',id)

    return Fantasma
}