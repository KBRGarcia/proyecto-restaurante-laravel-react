import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/banks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BankController::index
* @see app/Http/Controllers/BankController.php:15
* @route '/api/banks'
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
* @see \App\Http\Controllers\BankController::store
* @see app/Http/Controllers/BankController.php:64
* @route '/api/banks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/banks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BankController::store
* @see app/Http/Controllers/BankController.php:64
* @route '/api/banks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankController::store
* @see app/Http/Controllers/BankController.php:64
* @route '/api/banks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BankController::store
* @see app/Http/Controllers/BankController.php:64
* @route '/api/banks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BankController::store
* @see app/Http/Controllers/BankController.php:64
* @route '/api/banks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
export const show = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/banks/{bank}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
show.url = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bank: args }
    }

    if (Array.isArray(args)) {
        args = {
            bank: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bank: args.bank,
    }

    return show.definition.url
            .replace('{bank}', parsedArgs.bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
show.get = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
show.head = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
const showForm = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
showForm.get = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BankController::show
* @see app/Http/Controllers/BankController.php:74
* @route '/api/banks/{bank}'
*/
showForm.head = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
export const update = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/banks/{bank}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
update.url = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bank: args }
    }

    if (Array.isArray(args)) {
        args = {
            bank: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bank: args.bank,
    }

    return update.definition.url
            .replace('{bank}', parsedArgs.bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
update.put = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
update.patch = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
const updateForm = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
updateForm.put = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BankController::update
* @see app/Http/Controllers/BankController.php:94
* @route '/api/banks/{bank}'
*/
updateForm.patch = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\BankController::destroy
* @see app/Http/Controllers/BankController.php:118
* @route '/api/banks/{bank}'
*/
export const destroy = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/banks/{bank}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BankController::destroy
* @see app/Http/Controllers/BankController.php:118
* @route '/api/banks/{bank}'
*/
destroy.url = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bank: args }
    }

    if (Array.isArray(args)) {
        args = {
            bank: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bank: args.bank,
    }

    return destroy.definition.url
            .replace('{bank}', parsedArgs.bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BankController::destroy
* @see app/Http/Controllers/BankController.php:118
* @route '/api/banks/{bank}'
*/
destroy.delete = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\BankController::destroy
* @see app/Http/Controllers/BankController.php:118
* @route '/api/banks/{bank}'
*/
const destroyForm = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BankController::destroy
* @see app/Http/Controllers/BankController.php:118
* @route '/api/banks/{bank}'
*/
destroyForm.delete = (args: { bank: string | number } | [bank: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const BankController = { index, store, show, update, destroy }

export default BankController