import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/payment-methods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:17
* @route '/api/payment-methods'
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
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:65
* @route '/api/payment-methods'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/payment-methods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:65
* @route '/api/payment-methods'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:65
* @route '/api/payment-methods'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:65
* @route '/api/payment-methods'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:65
* @route '/api/payment-methods'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
export const show = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/payment-methods/{payment_method}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
show.url = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment_method: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payment_method: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payment_method: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payment_method: typeof args.payment_method === 'object'
        ? args.payment_method.id
        : args.payment_method,
    }

    return show.definition.url
            .replace('{payment_method}', parsedArgs.payment_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
show.get = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
show.head = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
const showForm = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
showForm.get = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:97
* @route '/api/payment-methods/{payment_method}'
*/
showForm.head = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
export const update = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/payment-methods/{payment_method}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
update.url = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment_method: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payment_method: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payment_method: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payment_method: typeof args.payment_method === 'object'
        ? args.payment_method.id
        : args.payment_method,
    }

    return update.definition.url
            .replace('{payment_method}', parsedArgs.payment_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
update.put = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
update.patch = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
const updateForm = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
updateForm.put = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:113
* @route '/api/payment-methods/{payment_method}'
*/
updateForm.patch = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:145
* @route '/api/payment-methods/{payment_method}'
*/
export const destroy = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/payment-methods/{payment_method}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:145
* @route '/api/payment-methods/{payment_method}'
*/
destroy.url = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment_method: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payment_method: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payment_method: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payment_method: typeof args.payment_method === 'object'
        ? args.payment_method.id
        : args.payment_method,
    }

    return destroy.definition.url
            .replace('{payment_method}', parsedArgs.payment_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:145
* @route '/api/payment-methods/{payment_method}'
*/
destroy.delete = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:145
* @route '/api/payment-methods/{payment_method}'
*/
const destroyForm = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:145
* @route '/api/payment-methods/{payment_method}'
*/
destroyForm.delete = (args: { payment_method: number | { id: number } } | [payment_method: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const paymentMethods = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default paymentMethods