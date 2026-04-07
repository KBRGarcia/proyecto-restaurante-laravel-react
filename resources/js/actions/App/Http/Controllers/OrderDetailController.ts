import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/order-details',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::index
* @see app/Http/Controllers/OrderDetailController.php:16
* @route '/order-details'
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
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/order-details/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::create
* @see app/Http/Controllers/OrderDetailController.php:72
* @route '/order-details/create'
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
* @see \App\Http\Controllers\OrderDetailController::store
* @see app/Http/Controllers/OrderDetailController.php:82
* @route '/order-details'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/order-details',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderDetailController::store
* @see app/Http/Controllers/OrderDetailController.php:82
* @route '/order-details'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::store
* @see app/Http/Controllers/OrderDetailController.php:82
* @route '/order-details'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderDetailController::store
* @see app/Http/Controllers/OrderDetailController.php:82
* @route '/order-details'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderDetailController::store
* @see app/Http/Controllers/OrderDetailController.php:82
* @route '/order-details'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
export const show = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/order-details/{order_detail}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
show.url = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_detail: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_detail: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_detail: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_detail: typeof args.order_detail === 'object'
        ? args.order_detail.id
        : args.order_detail,
    }

    return show.definition.url
            .replace('{order_detail}', parsedArgs.order_detail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
show.get = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
show.head = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
const showForm = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
showForm.get = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::show
* @see app/Http/Controllers/OrderDetailController.php:110
* @route '/order-details/{order_detail}'
*/
showForm.head = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
export const edit = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/order-details/{order_detail}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
edit.url = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_detail: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_detail: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_detail: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_detail: typeof args.order_detail === 'object'
        ? args.order_detail.id
        : args.order_detail,
    }

    return edit.definition.url
            .replace('{order_detail}', parsedArgs.order_detail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
edit.get = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
edit.head = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
const editForm = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
editForm.get = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\OrderDetailController::edit
* @see app/Http/Controllers/OrderDetailController.php:122
* @route '/order-details/{order_detail}/edit'
*/
editForm.head = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
export const update = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/order-details/{order_detail}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
update.url = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_detail: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_detail: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_detail: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_detail: typeof args.order_detail === 'object'
        ? args.order_detail.id
        : args.order_detail,
    }

    return update.definition.url
            .replace('{order_detail}', parsedArgs.order_detail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
update.put = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
update.patch = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
const updateForm = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
updateForm.put = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderDetailController::update
* @see app/Http/Controllers/OrderDetailController.php:135
* @route '/order-details/{order_detail}'
*/
updateForm.patch = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\OrderDetailController::destroy
* @see app/Http/Controllers/OrderDetailController.php:171
* @route '/order-details/{order_detail}'
*/
export const destroy = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/order-details/{order_detail}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\OrderDetailController::destroy
* @see app/Http/Controllers/OrderDetailController.php:171
* @route '/order-details/{order_detail}'
*/
destroy.url = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order_detail: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { order_detail: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            order_detail: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        order_detail: typeof args.order_detail === 'object'
        ? args.order_detail.id
        : args.order_detail,
    }

    return destroy.definition.url
            .replace('{order_detail}', parsedArgs.order_detail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderDetailController::destroy
* @see app/Http/Controllers/OrderDetailController.php:171
* @route '/order-details/{order_detail}'
*/
destroy.delete = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\OrderDetailController::destroy
* @see app/Http/Controllers/OrderDetailController.php:171
* @route '/order-details/{order_detail}'
*/
const destroyForm = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\OrderDetailController::destroy
* @see app/Http/Controllers/OrderDetailController.php:171
* @route '/order-details/{order_detail}'
*/
destroyForm.delete = (args: { order_detail: string | number | { id: string | number } } | [order_detail: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const OrderDetailController = { index, create, store, show, edit, update, destroy }

export default OrderDetailController