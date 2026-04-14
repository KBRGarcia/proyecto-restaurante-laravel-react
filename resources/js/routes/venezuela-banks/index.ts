import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/venezuela-banks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:14
* @route '/api/venezuela-banks'
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
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:60
* @route '/api/venezuela-banks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/venezuela-banks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:60
* @route '/api/venezuela-banks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:60
* @route '/api/venezuela-banks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:60
* @route '/api/venezuela-banks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:60
* @route '/api/venezuela-banks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
export const show = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/venezuela-banks/{venezuela_bank}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
show.url = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { venezuela_bank: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { venezuela_bank: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            venezuela_bank: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        venezuela_bank: typeof args.venezuela_bank === 'object'
        ? args.venezuela_bank.id
        : args.venezuela_bank,
    }

    return show.definition.url
            .replace('{venezuela_bank}', parsedArgs.venezuela_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
show.get = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
show.head = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
const showForm = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
showForm.get = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:85
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
showForm.head = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
export const update = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/venezuela-banks/{venezuela_bank}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
update.url = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { venezuela_bank: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { venezuela_bank: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            venezuela_bank: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        venezuela_bank: typeof args.venezuela_bank === 'object'
        ? args.venezuela_bank.id
        : args.venezuela_bank,
    }

    return update.definition.url
            .replace('{venezuela_bank}', parsedArgs.venezuela_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
update.put = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
update.patch = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
const updateForm = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
updateForm.put = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:101
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
updateForm.patch = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:126
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
export const destroy = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/venezuela-banks/{venezuela_bank}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:126
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
destroy.url = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { venezuela_bank: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { venezuela_bank: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            venezuela_bank: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        venezuela_bank: typeof args.venezuela_bank === 'object'
        ? args.venezuela_bank.id
        : args.venezuela_bank,
    }

    return destroy.definition.url
            .replace('{venezuela_bank}', parsedArgs.venezuela_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:126
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
destroy.delete = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:126
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
const destroyForm = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:126
* @route '/api/venezuela-banks/{venezuela_bank}'
*/
destroyForm.delete = (args: { venezuela_bank: number | { id: number } } | [venezuela_bank: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const venezuelaBanks = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default venezuelaBanks