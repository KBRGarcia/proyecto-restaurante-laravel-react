import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/product-branches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductBranchController::index
* @see app/Http/Controllers/ProductBranchController.php:14
* @route '/api/product-branches'
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
* @see \App\Http\Controllers\ProductBranchController::store
* @see app/Http/Controllers/ProductBranchController.php:76
* @route '/api/product-branches'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/product-branches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProductBranchController::store
* @see app/Http/Controllers/ProductBranchController.php:76
* @route '/api/product-branches'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductBranchController::store
* @see app/Http/Controllers/ProductBranchController.php:76
* @route '/api/product-branches'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductBranchController::store
* @see app/Http/Controllers/ProductBranchController.php:76
* @route '/api/product-branches'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductBranchController::store
* @see app/Http/Controllers/ProductBranchController.php:76
* @route '/api/product-branches'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
export const show = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/product-branches/{product_branch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
show.url = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_branch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product_branch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product_branch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product_branch: typeof args.product_branch === 'object'
        ? args.product_branch.id
        : args.product_branch,
    }

    return show.definition.url
            .replace('{product_branch}', parsedArgs.product_branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
show.get = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
show.head = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
const showForm = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
showForm.get = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProductBranchController::show
* @see app/Http/Controllers/ProductBranchController.php:97
* @route '/api/product-branches/{product_branch}'
*/
showForm.head = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
export const update = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/product-branches/{product_branch}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
update.url = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_branch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product_branch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product_branch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product_branch: typeof args.product_branch === 'object'
        ? args.product_branch.id
        : args.product_branch,
    }

    return update.definition.url
            .replace('{product_branch}', parsedArgs.product_branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
update.put = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
update.patch = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
const updateForm = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
updateForm.put = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductBranchController::update
* @see app/Http/Controllers/ProductBranchController.php:107
* @route '/api/product-branches/{product_branch}'
*/
updateForm.patch = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProductBranchController::destroy
* @see app/Http/Controllers/ProductBranchController.php:130
* @route '/api/product-branches/{product_branch}'
*/
export const destroy = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/product-branches/{product_branch}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProductBranchController::destroy
* @see app/Http/Controllers/ProductBranchController.php:130
* @route '/api/product-branches/{product_branch}'
*/
destroy.url = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_branch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { product_branch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            product_branch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        product_branch: typeof args.product_branch === 'object'
        ? args.product_branch.id
        : args.product_branch,
    }

    return destroy.definition.url
            .replace('{product_branch}', parsedArgs.product_branch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductBranchController::destroy
* @see app/Http/Controllers/ProductBranchController.php:130
* @route '/api/product-branches/{product_branch}'
*/
destroy.delete = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProductBranchController::destroy
* @see app/Http/Controllers/ProductBranchController.php:130
* @route '/api/product-branches/{product_branch}'
*/
const destroyForm = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductBranchController::destroy
* @see app/Http/Controllers/ProductBranchController.php:130
* @route '/api/product-branches/{product_branch}'
*/
destroyForm.delete = (args: { product_branch: number | { id: number } } | [product_branch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const productBranches = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default productBranches