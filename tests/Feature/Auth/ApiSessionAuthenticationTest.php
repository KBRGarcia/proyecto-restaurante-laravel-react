<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function withStatefulSanctumHeaders(): array
{
    return [
        'Origin' => 'http://localhost',
        'Referer' => 'http://localhost',
    ];
}

function primeCsrfCookie(): void
{
    $response = test()->withHeaders(withStatefulSanctumHeaders())->get('/sanctum/csrf-cookie');

    $xsrfToken = collect($response->headers->getCookies())
        ->first(fn ($cookie) => $cookie->getName() === 'XSRF-TOKEN')
        ?->getValue();

    if ($xsrfToken !== null) {
        test()->withHeader('X-XSRF-TOKEN', urldecode($xsrfToken));
    }
}

it('logs in via api using a stateful session without returning a token', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin->value,
        'status' => 'active',
    ]);

    $this->withHeaders(withStatefulSanctumHeaders());
    primeCsrfCookie();

    $response = $this->postJson('/api/login', [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $response->assertOk()
        ->assertJsonMissing(['token'])
        ->assertJsonStructure(['user', 'permissions']);

    $this->assertAuthenticated('web');

    $this->getJson('/api/me')
        ->assertOk()
        ->assertJsonPath('email', $admin->email);
});

it('rejects api login for client accounts', function () {
    $client = User::factory()->create([
        'role' => UserRole::Client->value,
        'status' => 'active',
    ]);

    $this->withHeaders(withStatefulSanctumHeaders());
    primeCsrfCookie();

    $this->postJson('/api/login', [
        'email' => $client->email,
        'password' => 'password',
    ])->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);

    $this->assertGuest('web');
});

it('requires authentication to access me', function () {
    $this->withHeaders(withStatefulSanctumHeaders());
    $this->defaultCookies = [];
    $this->unencryptedCookies = [];

    $this->getJson('/api/me')->assertUnauthorized();
});

it('logs out and invalidates the api session', function () {
    $admin = User::factory()->create([
        'role' => UserRole::Admin->value,
        'status' => 'active',
    ]);

    $this->withHeaders(withStatefulSanctumHeaders());
    primeCsrfCookie();

    $this->postJson('/api/login', [
        'email' => $admin->email,
        'password' => 'password',
    ])->assertOk();

    $this->assertAuthenticated('web');

    $logoutResponse = $this->postJson('/api/logout');
    $logoutResponse->assertOk();

    $this->assertGuest('web');

    // El cliente de pruebas puede conservar guards en memoria entre peticiones.
    $this->app['auth']->forgetGuards();
    $this->defaultCookies = [];
    $this->unencryptedCookies = [];

    $this->withHeaders(withStatefulSanctumHeaders());

    $this->getJson('/api/me')->assertUnauthorized();
});
