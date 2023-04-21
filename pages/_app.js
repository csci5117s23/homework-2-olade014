import { ClerkProvider } from '@clerk/nextjs'
import { light } from '@clerk/themes';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  
  return (
    <ClerkProvider {...pageProps} 
        appearance={{
          baseTheme:light,
          variables: {
            colorPrimary:'#262626',
            colorTextOnPrimaryBackground:'#ffffff',
            colorTextSecondary: '#000000',
            colorInputText: '#262626',
            colorInputBackground: '#ffffff',
            fontFamily:'Source Sans Pro',
          },
          layout: {
            socialButtonsPlacement:'bottom'
          }
        }}>
        
        <Component {...pageProps} />

      </ClerkProvider>
  
  )
}