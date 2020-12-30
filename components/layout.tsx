import Header from 'components/header'

export function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  )
}
