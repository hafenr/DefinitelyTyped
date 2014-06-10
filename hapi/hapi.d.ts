// Type definitions for hapi
// Project: http://github.com/spumko/hapi
// Definitions by: Hakubo <http://github.com/hakubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module Hapi {
	export interface ServerOptions {
		app?: any;
		cache?: string;
		cache?: {
			engine: any;
		};
		cors?: boolean;
		cors?: {
			origin?: Array<string>;
			isOriginExposed?: boolean;
			matchOrigin?: boolean;
			maxAge?: number;
			headers?: Array<string>;
			additionalHeaders?: Array<string>;
			methods?: Array<string>;
			additionalMethods?: Array<string>;
			exposedHeaders?: Array<string>;
			additionalExposedHeaders?: Array<string>;
			credentials?: boolean;
		};
		security?: boolean;
		security?: {
			hsts?: boolean;
			hsts?: {
				maxAge: number;
				includeSubdomains: boolean;
			};
			xframe?: boolean;
			xframe?: string;
			xframe?: {
				rule: string;
				source: any;
			};
			xss?: boolean;
			noOpen?: boolean;
			noSniff?: boolean;
		};
		debug?: {
			request: Array<string>;
		};
		files?: {
			relativeTo: string;
			etagsCacheMaxSize: number;
		};
		json?: {
			replacer?: Function;
			replacer?: Array<Function>;
			space?: number;
		};
		labels?: Array<string>;
		load?: {
			maxHeapUsedBytes?: number;
			maxRssBytes?: number;
			maxEventLoopDelay?: number;
			sampleInterval?: number;
		};
		location?: string;
		payload?: {
			maxBytes: number;
			uploads: string;
		};
		plugins?: any;
		router?: {
			isCaseSensitive?: boolean;
			stripTrailingSlash?: boolean;
		};
		state?: {
			cookies: {
				parse?: boolean;
				failAction?: string;
				clearInvalid?: boolean;
				strictHeader?: boolean;
			}
		};
		timeout?: {
			server?: boolean;
			server?: number;
			client?: boolean;
			client?: number;
			socket?: boolean;
			socket?: number;
		};
		tls?: any; //This should be Node.tls
		maxSockets?: number;
		validation?: any;
		views?: ServerView;
	}

	export class Pack {
		require(name: string, options: {}, callback: Function): void;
	}

	interface ServerView {
		engines: {
			module: string;
			compile: (template: string, options: any): (context: any, options: any);
			compile: (template: string, options: any, callback: (err: any, compiled: (context: any, options: any, callback: (err: any, rendered: boolean)))): void;
		};
		defaultExtension: string;
		path?: string;
		partialsPath?: string;
		helpersPath?: string;
		basePath: string;
		layout?: boolean;
		layoutPath?: string;
		layoutKeyword?: string;
		encoding?: string;
		isCached?: boolean;
		allowAbsolutePaths?: boolean;
		allowInsecureAccess?: boolean;
		compileOptions?: any;
		runtimeOptions?: any;
		contentType?: string;
		compileMode?: string;
	}

	interface RouteOptions {
		path: string;
		method: string;
		vhost?: string;
		vhost?: Array<string>;
		handler: string;
		handler: ();
		handler: {
			file: string;
			file: (request: Request);
			file: {
				path: string;
				filename?: string;
				mode?: boolean;
				mode?: string;
				lookupCompressed: boolean;
			};
			directory: {
				path: string;
				path: Array<string>;
				path: (request: Request): string;
				path: (request: Request): Array<string>;
				index?: boolean;
				listing?: boolean;
				showHidden?: boolean;
				redirectToSlash?: boolean;
				lookupCompressed?: boolean;
				defaultExtension?: string;
			};
			proxy?: {
				host?: string;
				port?: number;
				protocol?: string;
				uri?: string;
				passThrough?: boolean;
				rejectUnauthorized?: boolean;
				xforward?: boolean;
				redirects?: boolean;
				redirects?: number;
				timeout?: number;

				mapUri?: (request: Request, callback: (err: any, uri: string, headers: {[key: string]: string}): void): void;
				onResponse: (
					err: any,
					res: any,//Node Response
					req: any,//Node Request
					reply: (): void,
					settings: any,
					ttl: number
				);
				ttl: number;
			};
			view: string;
			view: {
				template: string;
				context: {
					payload: any;
					params: any;
					query: any;
					pre: any;
				}
			};
			config: {
				handler: any;
				bind: any;
				app: any;
				plugins: {
					[name: string]: any;
				};
				pre: Array<()>;
				validate: {
					headers: any;
					params: any;
					query: any;
					payload: any;
					errorFields?: any;
					failAction?: string;
					failAction?: (source: string, error: any, next: ());
				};
				payload: {
					output: {
						data: any;
						stream: any;
						file: any;
					};
					parse?: any;
					allow?: string;
					allow?: Array<string>;
					override?: string;
					maxBytes?: number;
					uploads?: number;
					failAction?: string;
				};
				response: {
					schema: any;
					sample: number;
					failAction: string;
				};
				cache: {
					privacy: string;
					expiresIn: number;
					expiresAt: number;
				};
				auth: string;
				auth: boolean;
				auth: {
					mode: string;
					strategies: Array<string>;
					payload?: boolean;
					payload?: string;
					tos?: boolean;
					tos?: string;
					scope?: string;
					scope?: Array<string>;
					entity: string;
				};
				cors?: boolean;
				jsonp?: string;
				description?: string;
				notes?: string;
				notes?: Array<string>;
				tags?: Array<string>;
			}
		};
	}

	export class Server {
		app: any;
		methods: Array;
		info: {
			port: number;
			host?: string;
			protocol?: string;
			uri?: string;
		};
		listener: any;// Node Http server
		load: {
			eventLoopDelay: number;
			heapUsed: number;
			rss: number;
		};
		pack: Pack;
		plugins: {
			[pluginName: string]: any;
		};


		start(callback?: ()): void;
		stop(options?: {timeout: number;}, callback?: ()): void;
		route(options: RouteOptions): void;
		route(routes: Array<RouteOptions>): void;
		table(host?: string): Array<RouteOptions>;
		log(tags: string, data?: string, timestamp?: number): void;
		log(tags: Array<string>, data?: string, timestamp?: number): void;
		log(tags: string, data?: any, timestamp?: number): void;
		log(tags: Array<string>, data?: any, timestamp?: number): void;
		state(name: string, options?: {
			ttl: number;
			isSecure: boolean;
			isHttpOnly: boolean;
			path: string;
			domain: string;
			autoValue: (request: Request, next: (err: any, value: any): void): void;
			encoding?: string;
			sign: any;
			password: string;
			iron: any;
		});
		views: (options: ServerView): void;
		cache: (name: string, options: {
			expiresIn: number;
			expiresAt: number;
			staleIn: number;
			staleTimeout: number;
			cache: string;
		}): void;

		auth: {
			scheme: (name: string, scheme: {
				name: string;
				scheme: (server: Server, options: any): (authenticate: any, payload: any, response: any);
			});
			strategy: any;
		};
		ext: (event: any, method: string, options?: any): void;
		method: (method: Array<{name: string; fn: (); options: any}>): void;
		method: (name: string, fn: (), options: any): void;
		inject: (options: any, callback: any): void;
		handler: (name: string, method: (name: string, options: any): void): void;
	}

	export interface Request {
		app: any;
		auth: {
			isAuthenticated: boolean;
			credentials: Object;
			artifacts: Object;
			session: Object
		};
		domain: any;
		headers: Object;
		id: number;
		info: {
			received: number;
			remoteAddress: string;
			remotePort: number;
			referrer: string;
			host: string;
		};
		method: string;
		mime?: string;
		params: any;
		path: string;
		payload: any;
		plugins: Object;
		pre: Object;
		response: Object;
		responses: Object;
		query: Object;
		raw: {
			req: any; //http.ClientRequest
			res: any; //http.ClientResponse
		};
		route: string;
		server: Server;
		session: any;
		state: Object;
		url: Object;

		setUrl? (url: string): void;
		setMethod? (method: string): void;
		log (tags: string, data?: string, timestamp?: number): void;
		log (tags: string, data?: Object, timestamp?: number): void;
		log (tags: string[], data?: string, timestamp?: number): void;
		log (tags: string[], data?: Object, timestamp?: number): void;
		getLog(): string[];
		getLog(tag: string): string[];
		getLog(tags: string[]): string[];
		tail(name?: string): Function;
	}

	export interface Response {
		statusCode: number;
		headers: Object;
		source: any;
		variety: string;
		app: any;
		plugins: Object;
		settings: {
			encoding: string;
			charset: string;
			location: string;
			ttl: number;
			stringify: any;
			passThrough: boolean;
		}

		code (statusCode: number): void;
		header (name: string, value: string, options?: {
			append: boolean;
			separator: string;
			override: boolean;
		}): void;
		type (mimeType: string): void;
		bytes (length: number): void;
		vary (header: string): void;
		location (location: string): void;
		created (location: string): void;
		redirect (location: string): void;
		encoding (encoding: string): void;
		charset (charset: string): void;
		ttl (ttl: number): void;
		state (name: string, value: string, options?: any): void;
		unstate (name: string): void;

		replacer (method: Function): void;
		replacer (method: Array<Function>): void;
		spaces (count: number): void;

		temporary (isTemporary: boolean): void;
		permanent (isPermanent: boolean): void;
		rewritable (isRewritable: boolean): void;
	}

	export module reply {
		function file(path: string, options: {
			filePath: string;
			options: {
				filename: string;
				mode: string
			}
		}): void;

		function view(template: string, context?: Object, options?: Object): Response;
		function close(options?: Object): void;
		function proxy(options: Object): void;

		export function reply(result: any): any;
	}

	export function createServer (host: string, port: number, options?: ServerOptions): Server;
}

declare module "hapi" {
	export = Hapi;
}
