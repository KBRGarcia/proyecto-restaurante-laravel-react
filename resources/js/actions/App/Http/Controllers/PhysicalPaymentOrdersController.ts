import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/physical-payment-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::index
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:16
* @route '/physical-payment-orders'
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
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/physical-payment-orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::create
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:68
* @route '/physical-payment-orders/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:94
* @route '/physical-payment-orders'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/physical-payment-orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:94
* @route '/physical-payment-orders'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:94
* @route '/physical-payment-orders'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:94
* @route '/physical-payment-orders'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::store
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:94
* @route '/physical-payment-orders'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
export const show = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/physical-payment-orders/{physical_payment_order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
show.url = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
show.get = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
show.head = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
const showForm = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
showForm.get = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::show
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:118
* @route '/physical-payment-orders/{physical_payment_order}'
*/
showForm.head = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
export const edit = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/physical-payment-orders/{physical_payment_order}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
edit.url = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{physical_payment_order}', parsedArgs.physical_payment_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
edit.get = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
edit.head = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
const editForm = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
editForm.get = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::edit
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:130
* @route '/physical-payment-orders/{physical_payment_order}/edit'
*/
editForm.head = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
export const update = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/physical-payment-orders/{physical_payment_order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
update.url = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
update.put = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
update.patch = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::update
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
const updateForm = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
updateForm.put = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:156
* @route '/physical-payment-orders/{physical_payment_order}'
*/
updateForm.patch = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:173
* @route '/physical-payment-orders/{physical_payment_order}'
*/
export const destroy = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/physical-payment-orders/{physical_payment_order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:173
* @route '/physical-payment-orders/{physical_payment_order}'
*/
destroy.url = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:173
* @route '/physical-payment-orders/{physical_payment_order}'
*/
destroy.delete = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PhysicalPaymentOrdersController::destroy
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:173
* @route '/physical-payment-orders/{physical_payment_order}'
*/
const destroyForm = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PhysicalPaymentOrdersController.php:173
* @route '/physical-payment-orders/{physical_payment_order}'
*/
destroyForm.delete = (args: { physical_payment_order: string | number | { id: string | number } } | [physical_payment_order: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PhysicalPaymentOrdersController = { index, create, store, show, edit, update, destroy }

export default PhysicalPaymentOrdersController