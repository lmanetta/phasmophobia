import { supabase } from "../client";

export const getEvidencias = async () => {


    let { data: Evidencias, error } = await supabase
        .from('Evidencias')
        .select('*');


    return Evidencias;

}

export const getEvidenciasByFantasmaId = async (fantasma_id) => {
    let { data: Evidencias, error } = await supabase.from('PruebaFantasma').select("*").eq("fantasma_id", fantasma_id)
    return Evidencias;
}

export const getEvidenciasByEvidenciaId = async (evidencia_id) => {
    let { data: Evidencias, error } = await supabase.from('PruebaFantasma').select('*').eq("evidencia_id", evidencia_id)
    return Evidencias;
}