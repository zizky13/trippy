# It's now live on:
> http://trippy.my.id/

## Requirements:
- Node version 20 or newer
- Composer version 2.8 or newer
- PHP version 8.3
- Mapbox API Key
- Laravel version 11

## Description

Trippy is an itinerary route-optimizer built by utilizing Travelling Salesman Problem (TSP). Trippy works by converting location inputted by user's into set of nodes and by using permutation, find the shortest distance to travel from starting point to end point using TSP algorithm. User can login and input their itinerary following the form provided. Our algorithm shall optimize and save it to the database, so user can access previous itineraries.

## How to test
1. Clone this repo to either www (if laragon) or htdocs(if xampp) folder in your local:
>` git clone https://github.com/luthfibintang/trippy.git `

2. Add MAPBOX_API_KEY into your .env:
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:BNIlf1C4X25aN2nDMjfn4ccvRSXHoXPeUdoyfqvfFHo=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://trippy.test

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database
MAPBOX_ACCESS_TOKEN={your mapbox token here}
VITE_MAPBOX_ACCESS_TOKEN={your token here (same as above)}

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

//configure database as per your requeirement
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trippy
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

3. Start laragon / xampp
4. Run this on terminal:
>`npm i`
5. Run this:
>`npm run dev`
6. Run this:
>`php artisan serve`
7. Done


