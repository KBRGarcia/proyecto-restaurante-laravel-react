import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/payment-methods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::index
* @see app/Http/Controllers/PaymentMethodController.php:19
* @route '/payment-methods'
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
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/payment-methods/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::create
* @see app/Http/Controllers/PaymentMethodController.php:68
* @route '/payment-methods/create'
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
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:78
* @route '/payment-methods'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/payment-methods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:78
* @route '/payment-methods'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:78
* @route '/payment-methods'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:78
* @route '/payment-methods'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::store
* @see app/Http/Controllers/PaymentMethodController.php:78
* @route '/payment-methods'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
export const show = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/payment-methods/{payment_method}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
show.url = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
show.get = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
show.head = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
const showForm = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
showForm.get = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::show
* @see app/Http/Controllers/PaymentMethodController.php:110
* @route '/payment-methods/{payment_method}'
*/
showForm.head = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
export const edit = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/payment-methods/{payment_method}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
edit.url = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{payment_method}', parsedArgs.payment_method.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
edit.get = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
edit.head = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
const editForm = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
editForm.get = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::edit
* @see app/Http/Controllers/PaymentMethodController.php:120
* @route '/payment-methods/{payment_method}/edit'
*/
editForm.head = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
export const update = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/payment-methods/{payment_method}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
update.url = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
update.put = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
update.patch = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::update
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
const updateForm = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
updateForm.put = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PaymentMethodController.php:131
* @route '/payment-methods/{payment_method}'
*/
updateForm.patch = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PaymentMethodController.php:163
* @route '/payment-methods/{payment_method}'
*/
export const destroy = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/payment-methods/{payment_method}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:163
* @route '/payment-methods/{payment_method}'
*/
destroy.url = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/PaymentMethodController.php:163
* @route '/payment-methods/{payment_method}'
*/
destroy.delete = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PaymentMethodController::destroy
* @see app/Http/Controllers/PaymentMethodController.php:163
* @route '/payment-methods/{payment_method}'
*/
const destroyForm = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/PaymentMethodController.php:163
* @route '/payment-methods/{payment_method}'
*/
destroyForm.delete = (args: { payment_method: string | number | { id: string | number } } | [payment_method: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default paymentMethods