import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/order-payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::index
* @see app/Http/Controllers/OrderPaymentController.php:17
* @route '/api/order-payments'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\OrderPaymentController::store
* @see app/Http/Controllers/OrderPaymentController.php:71
* @route '/api/order-payments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/order-payments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderPaymentController::store
* @see app/Http/Controllers/OrderPaymentController.php:71
* @route '/api/order-payments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderPaymentController::store
* @see app/Http/Controllers/OrderPaymentController.php:71
* @route '/api/order-payments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::store
* @see app/Http/Controllers/OrderPaymentController.php:71
* @route '/api/order-payments'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::store
* @see app/Http/Controllers/OrderPaymentController.php:71
* @route '/api/order-payments'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
export const show = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/order-payments/{order_payment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
show.url = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_payment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_payment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_payment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_payment: typeof args.order_payment === 'object'
        ? args.order_payment.id
        : args.order_payment,
    }

    return show.definition.url
            .replace('{order_payment}', parsedArgs.order_payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
show.get = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
show.head = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
const showForm = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
showForm.get = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::show
* @see app/Http/Controllers/OrderPaymentController.php:83
* @route '/api/order-payments/{order_payment}'
*/
showForm.head = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
export const update = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/order-payments/{order_payment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
update.url = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_payment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_payment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_payment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_payment: typeof args.order_payment === 'object'
        ? args.order_payment.id
        : args.order_payment,
    }

    return update.definition.url
            .replace('{order_payment}', parsedArgs.order_payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
update.put = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
update.patch = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
const updateForm = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
updateForm.put = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::update
* @see app/Http/Controllers/OrderPaymentController.php:91
* @route '/api/order-payments/{order_payment}'
*/
updateForm.patch = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\OrderPaymentController::destroy
* @see app/Http/Controllers/OrderPaymentController.php:103
* @route '/api/order-payments/{order_payment}'
*/
export const destroy = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/order-payments/{order_payment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\OrderPaymentController::destroy
* @see app/Http/Controllers/OrderPaymentController.php:103
* @route '/api/order-payments/{order_payment}'
*/
destroy.url = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_payment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_payment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_payment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_payment: typeof args.order_payment === 'object'
        ? args.order_payment.id
        : args.order_payment,
    }

    return destroy.definition.url
            .replace('{order_payment}', parsedArgs.order_payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderPaymentController::destroy
* @see app/Http/Controllers/OrderPaymentController.php:103
* @route '/api/order-payments/{order_payment}'
*/
destroy.delete = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::destroy
* @see app/Http/Controllers/OrderPaymentController.php:103
* @route '/api/order-payments/{order_payment}'
*/
const destroyForm = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderPaymentController::destroy
* @see app/Http/Controllers/OrderPaymentController.php:103
* @route '/api/order-payments/{order_payment}'
*/
destroyForm.delete = (args: { order_payment: number | { id: number } } | [order_payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const orderPayments = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default orderPayments