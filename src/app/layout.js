import './globals.css'
import './login.css'
import './[id]/loding.css'
export const metadata = {
  title: 'HOW ARE YOU TODAY',
  description: 'Lets go',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
      </head>
      <body >
        {children}
      </body>
    </html>
  )
}
