import { Theme } from "styles/Theme"
import "styles/globals.css"
import Providers from "lib/providers"
import DarkModeSwitch from "ui/Buttons/DarkModeSwitch"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body className="bg-gray-100 dark:bg-gray-900">
        <Providers>
        <Theme>
          <div className="flex justify-end mr-10 mt-10">
        <DarkModeSwitch/></div>
{children}</Theme>
        </Providers>
        </body>
    </html>
  )
}
