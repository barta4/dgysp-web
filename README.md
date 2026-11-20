# DG y SP Servicios — Sitio web

Sitio estático multipágina para **DG y SP Servicios** (Montevideo, Uruguay): reformas integrales, electricidad, sanitaria, pintura, albañilería y mantenimiento.

Sin frameworks ni build: HTML, CSS y JavaScript plano. Se publica en GitHub Pages.

## Estructura

```
index.html        Inicio
servicios.html    Los seis rubros
reformas.html     Cocinas y baños
obras.html        Antes / durante / después y avances de obra
nosotros.html     Identidad y equipo
contacto.html     Canales directos y cotizador por WhatsApp
styles.css        Estilos y sistema de diseño
app.js            Menú móvil, tabs, lightbox y formulario
assets/img/       Fotografías y piezas gráficas
```

El header y el footer se repiten en cada página porque el sitio no tiene sistema de plantillas. Si se cambia un teléfono o un enlace del menú, hay que actualizarlo en los seis archivos.

## Ver localmente

```bash
python3 -m http.server 8000
```

Abrir <http://localhost:8000>.

## Publicación

GitHub Pages sirve el contenido de la rama `main`, carpeta raíz:

- URL: <https://barta4.github.io/dgysp-web/>
- Configuración: **Settings → Pages → Deploy from a branch → main / (root)**

Cada `push` a `main` republica el sitio automáticamente en uno o dos minutos.

## Dominio propio

1. En **Settings → Pages → Custom domain** escribir el dominio.
2. En el registrador:
   - Registros `A` del dominio raíz: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `CNAME` de `www` hacia `barta4.github.io`.
3. Activar **Enforce HTTPS** una vez que el DNS propague.

## Formulario

El cotizador no envía datos a un servidor: arma el mensaje y abre WhatsApp con la consulta ya redactada. No requiere backend ni base de datos.

## Créditos

Fotografías y piezas gráficas: DG y SP Servicios.
