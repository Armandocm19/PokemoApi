/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { //Esta propiedad permite decirle a Next qué dominios puede permitir extraer imagenes
    //ya que son url's fuera de la aplicacion
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
