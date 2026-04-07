import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/venezuela-banks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::index
* @see app/Http/Controllers/VenezuelaBankController.php:15
* @route '/venezuela-banks'
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
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/venezuela-banks/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::create
* @see app/Http/Controllers/VenezuelaBankController.php:62
* @route '/venezuela-banks/create'
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
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:72
* @route '/venezuela-banks'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/venezuela-banks',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:72
* @route '/venezuela-banks'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:72
* @route '/venezuela-banks'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:72
* @route '/venezuela-banks'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::store
* @see app/Http/Controllers/VenezuelaBankController.php:72
* @route '/venezuela-banks'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
export const show = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/venezuela-banks/{venezuela_bank}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
show.url = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
show.get = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
show.head = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
const showForm = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
showForm.get = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::show
* @see app/Http/Controllers/VenezuelaBankController.php:99
* @route '/venezuela-banks/{venezuela_bank}'
*/
showForm.head = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
export const edit = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/venezuela-banks/{venezuela_bank}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
edit.url = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{venezuela_bank}', parsedArgs.venezuela_bank.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
edit.get = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
edit.head = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
const editForm = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
editForm.get = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::edit
* @see app/Http/Controllers/VenezuelaBankController.php:109
* @route '/venezuela-banks/{venezuela_bank}/edit'
*/
editForm.head = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
export const update = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/venezuela-banks/{venezuela_bank}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
update.url = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
update.put = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
update.patch = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::update
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
const updateForm = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
updateForm.put = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VenezuelaBankController.php:120
* @route '/venezuela-banks/{venezuela_bank}'
*/
updateForm.patch = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VenezuelaBankController.php:147
* @route '/venezuela-banks/{venezuela_bank}'
*/
export const destroy = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/venezuela-banks/{venezuela_bank}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:147
* @route '/venezuela-banks/{venezuela_bank}'
*/
destroy.url = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
* @see app/Http/Controllers/VenezuelaBankController.php:147
* @route '/venezuela-banks/{venezuela_bank}'
*/
destroy.delete = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VenezuelaBankController::destroy
* @see app/Http/Controllers/VenezuelaBankController.php:147
* @route '/venezuela-banks/{venezuela_bank}'
*/
const destroyForm = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/VenezuelaBankController.php:147
* @route '/venezuela-banks/{venezuela_bank}'
*/
destroyForm.delete = (args: { venezuela_bank: string | number | { id: string | number } } | [venezuela_bank: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default venezuelaBanks