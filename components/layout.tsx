import Header from './header'
import { Container } from '../styles'

export function Layout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
