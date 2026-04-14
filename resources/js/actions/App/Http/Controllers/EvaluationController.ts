import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EvaluationController::index
* @see app/Http/Controllers/EvaluationController.php:20
* @route '/api/evaluations'
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
* @see \App\Http\Controllers\EvaluationController::store
* @see app/Http/Controllers/EvaluationController.php:93
* @route '/api/evaluations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/evaluations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EvaluationController::store
* @see app/Http/Controllers/EvaluationController.php:93
* @route '/api/evaluations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::store
* @see app/Http/Controllers/EvaluationController.php:93
* @route '/api/evaluations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EvaluationController::store
* @see app/Http/Controllers/EvaluationController.php:93
* @route '/api/evaluations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EvaluationController::store
* @see app/Http/Controllers/EvaluationController.php:93
* @route '/api/evaluations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
export const show = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/evaluations/{evaluation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
show.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return show.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
show.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
show.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
const showForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
showForm.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EvaluationController::show
* @see app/Http/Controllers/EvaluationController.php:120
* @route '/api/evaluations/{evaluation}'
*/
showForm.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
export const update = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/evaluations/{evaluation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
update.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return update.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
update.put = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
update.patch = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
const updateForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
updateForm.put = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EvaluationController::update
* @see app/Http/Controllers/EvaluationController.php:164
* @route '/api/evaluations/{evaluation}'
*/
updateForm.patch = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\EvaluationController::destroy
* @see app/Http/Controllers/EvaluationController.php:191
* @route '/api/evaluations/{evaluation}'
*/
export const destroy = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/evaluations/{evaluation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EvaluationController::destroy
* @see app/Http/Controllers/EvaluationController.php:191
* @route '/api/evaluations/{evaluation}'
*/
destroy.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return destroy.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::destroy
* @see app/Http/Controllers/EvaluationController.php:191
* @route '/api/evaluations/{evaluation}'
*/
destroy.delete = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\EvaluationController::destroy
* @see app/Http/Controllers/EvaluationController.php:191
* @route '/api/evaluations/{evaluation}'
*/
const destroyForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EvaluationController::destroy
* @see app/Http/Controllers/EvaluationController.php:191
* @route '/api/evaluations/{evaluation}'
*/
destroyForm.delete = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const EvaluationController = { index, store, show, update, destroy }

export default EvaluationController