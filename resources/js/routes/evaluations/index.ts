import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EvaluationController::index
 * @see app/Http/Controllers/EvaluationController.php:22
 * @route '/evaluations'
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
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/evaluations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EvaluationController::create
 * @see app/Http/Controllers/EvaluationController.php:72
 * @route '/evaluations/create'
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
* @see \App\Http\Controllers\EvaluationController::store
 * @see app/Http/Controllers/EvaluationController.php:106
 * @route '/evaluations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/evaluations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EvaluationController::store
 * @see app/Http/Controllers/EvaluationController.php:106
 * @route '/evaluations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::store
 * @see app/Http/Controllers/EvaluationController.php:106
 * @route '/evaluations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EvaluationController::store
 * @see app/Http/Controllers/EvaluationController.php:106
 * @route '/evaluations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EvaluationController::store
 * @see app/Http/Controllers/EvaluationController.php:106
 * @route '/evaluations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EvaluationController::show
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
export const show = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/evaluations/{evaluation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EvaluationController::show
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
show.url = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
show.get = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EvaluationController::show
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
show.head = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EvaluationController::show
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
    const showForm = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EvaluationController::show
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
        showForm.get = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EvaluationController::show
 * @see app/Http/Controllers/EvaluationController.php:133
 * @route '/evaluations/{evaluation}'
 */
        showForm.head = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
export const edit = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/evaluations/{evaluation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
edit.url = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
edit.get = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
edit.head = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
    const editForm = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
        editForm.get = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EvaluationController::edit
 * @see app/Http/Controllers/EvaluationController.php:145
 * @route '/evaluations/{evaluation}/edit'
 */
        editForm.head = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\EvaluationController::update
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
export const update = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/evaluations/{evaluation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EvaluationController::update
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
update.url = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
update.put = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\EvaluationController::update
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
update.patch = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\EvaluationController::update
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
    const updateForm = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
        updateForm.put = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/EvaluationController.php:182
 * @route '/evaluations/{evaluation}'
 */
        updateForm.patch = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/EvaluationController.php:209
 * @route '/evaluations/{evaluation}'
 */
export const destroy = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/evaluations/{evaluation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EvaluationController::destroy
 * @see app/Http/Controllers/EvaluationController.php:209
 * @route '/evaluations/{evaluation}'
 */
destroy.url = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/EvaluationController.php:209
 * @route '/evaluations/{evaluation}'
 */
destroy.delete = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\EvaluationController::destroy
 * @see app/Http/Controllers/EvaluationController.php:209
 * @route '/evaluations/{evaluation}'
 */
    const destroyForm = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/EvaluationController.php:209
 * @route '/evaluations/{evaluation}'
 */
        destroyForm.delete = (args: { evaluation: string | number | { id: string | number } } | [evaluation: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const evaluations = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default evaluations