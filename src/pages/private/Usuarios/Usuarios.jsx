import { UsuariosDashboard } from "./components/UsuariosDashboard"
import { UsuariosTable } from "./components/UsuariosTable"

export const Usuarios = () => {
  return (
    <div className="w-auto">
      <UsuariosDashboard />
      <UsuariosTable />
    </div>
  )
}
