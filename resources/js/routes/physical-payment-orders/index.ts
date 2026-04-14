import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/physical-payment-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:15
* @route '/api/physical-payment-orders'
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
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:81
* @route '/api/physical-payment-orders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/physical-payment-orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:81
* @route '/api/physical-payment-orders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:81
* @route '/api/physical-payment-orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:81
* @route '/api/physical-payment-orders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:81
* @route '/api/physical-payment-orders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
export const show = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/physical-payment-orders/{physical_payment_order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
show.url = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_payment_order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { physical_payment_order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            physical_payment_order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_payment_order: typeof args.physical_payment_order === 'object'
        ? args.physical_payment_order.id
        : args.physical_payment_order,
    }

    return show.definition.url
            .replace('{physical_payment_order}', parsedArgs.physical_payment_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
show.get = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
show.head = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
const showForm = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
showForm.get = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:103
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
showForm.head = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
export const update = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/physical-payment-orders/{physical_payment_order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
update.url = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_payment_order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { physical_payment_order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            physical_payment_order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_payment_order: typeof args.physical_payment_order === 'object'
        ? args.physical_payment_order.id
        : args.physical_payment_order,
    }

    return update.definition.url
            .replace('{physical_payment_order}', parsedArgs.physical_payment_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
update.put = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
update.patch = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
const updateForm = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
updateForm.put = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:135
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
updateForm.patch = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:150
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
export const destroy = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/physical-payment-orders/{physical_payment_order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:150
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
destroy.url = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_payment_order: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { physical_payment_order: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            physical_payment_order: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        physical_payment_order: typeof args.physical_payment_order === 'object'
        ? args.physical_payment_order.id
        : args.physical_payment_order,
    }

    return destroy.definition.url
            .replace('{physical_payment_order}', parsedArgs.physical_payment_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:150
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
destroy.delete = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:150
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
const destroyForm = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:150
* @route '/api/physical-payment-orders/{physical_payment_order}'
*/
destroyForm.delete = (args: { physical_payment_order: number | { id: number } } | [physical_payment_order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const physicalPaymentOrders = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default physicalPaymentOrders