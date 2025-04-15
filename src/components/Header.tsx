import { SodaLogo } from "./SodaLogo"


export const Header = () => {
  return (
    <header className="-mb-28 flex justify-center py-4">
        <SodaLogo className="z-10 h-20 cursor-pointer text-sky-800"/>
    </header>
  )
}