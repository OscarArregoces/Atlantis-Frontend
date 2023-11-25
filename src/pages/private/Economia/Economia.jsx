import { BarGraphic } from "../../../components/private/graphics/BarGraphic"

export const Economia = () => {
  return (
    <div className="w-screen max-w-screen h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] bg-white flex">
      <div className="w-1/2">
        <BarGraphic />
      </div>
      <div className="w-1/2">
        <BarGraphic />
      </div>
    </div>
  )
}
