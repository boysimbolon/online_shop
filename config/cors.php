<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Allow all methods (GET, POST, PUT, DELETE, etc.)
    'allowed_methods' => ['*'],

    // Only allow requests from 'lpm.unai.edu'
    'allowed_origins' => ['https://meonlineshop.netlify.app/'],

    // Optionally, you can use patterns if you want to be more specific
    'allowed_origins_patterns' => [],

    // Allow all headers
    'allowed_headers' => ['*'],

    // Expose certain headers if needed (e.g., Authorization, X-Requested-With)
    'exposed_headers' => [],

    // Set cache time for preflight responses (OPTIONS)
    'max_age' => 3600, // Increase for performance

    // Set to true if credentials are needed (e.g., cookies, Authorization)
    'supports_credentials' => true,

];
