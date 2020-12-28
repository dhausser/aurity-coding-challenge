import { Global, css } from "@emotion/react"
import Header from "../components/header"

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default function Layout({ children }) {
  return (
    <div>
      <Global styles={globalStyles} />
      <Header />
      {children}
    </div>
  )
}
