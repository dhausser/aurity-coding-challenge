import Header from './header'
import { Container } from '../styles'

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
