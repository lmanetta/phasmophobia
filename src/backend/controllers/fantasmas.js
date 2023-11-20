import { supabase } from "../client";

export const getFantasmas = async () => {

    let { data: Fantasmas, error } = await supabase
        .from('Fantasmas')
        .select('*');
        
    return Fantasmas;

}