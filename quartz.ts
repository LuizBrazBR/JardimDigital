import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"

// Esconde o glossário do explorer (a pasta "tags" já ficava de fora por padrão).
// Os verbetes continuam na busca, nas prévias e nos links das aulas.
// O ExternalPlugin.Explorer({...}) da documentação não tem efeito nesta versão,
// porque o Explorer não entra no mapa de overrides do .quartz/plugins/index.ts.
// A chave é o "source" do plugin no quartz.config.yaml.
componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  filterFn: (node: { slugSegment: string }) =>
    node.slugSegment !== "tags" && node.slugSegment !== "glossario",
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
