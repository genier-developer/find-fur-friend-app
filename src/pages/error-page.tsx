import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const ErrorPage = () => {
  const image = 'src/assets/images/404.jpg'

  return (
    <div style={{ textAlign: 'center' }}>
      <img alt={'404'} src={image} style={{ marginBottom: '20px', width: '50%' }} />
      <Typography variant={'h4'}>Page not found!</Typography>
      <Typography sx={{ marginBottom: 2, marginTop: 2 }} variant={'h3'}>
        404
      </Typography>
      <Link href={'/'}>Back home</Link>
    </div>
  )
}
export default ErrorPage
