import type {PageLoader} from "$lib/module/PageLoader";

const parseRoute = (routes: Record<string, PageLoader>, path: string): { loader: PageLoader | null, params: any } => {
    for (const routePath in routes) {
        const routeRegex = pathToRegex(routePath);
        const match = path.match(routeRegex);
        if (match) {
            const params = extractParams(routePath, match);
            console.log('获取路由', routes[routePath]);
            return {
                loader: routes[routePath],
                params: params,
            };
        }
    }

    return {
        loader: null,
        params: {},
    };
}

const pathToRegex = (routePath: string) => {
    const paramNames = [];
    const regexPath = routePath.replace(/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([\\w-]+)'; // 修改这里，匹配字母、数字、下划线和连字符
    });
    return new RegExp(`^${regexPath}$`);
}

const extractParams = (routePath: string, match: RegExpMatchArray) => {
    const params: any = {};
    const paramNames: Array<any> = [];

    routePath.split('/').forEach(part => {
        if (part.startsWith(':')) {
            paramNames.push(part.substring(1));
        }
    });

    paramNames.forEach((paramName, index) => {
        params[paramName] = match[index + 1];
    });

    return params;
}

const parseHash = (hashStr: string): { path: string, query: any } => {
    if (!hashStr) {
        return {
            path: '/',
            query: {}
        }
    } else {
        const hashContent = hashStr.substring(1);
        const parts = hashContent.split('?');
        let path = parts[0];
        let paramsStr = parts[1];

        // 解析查询参数
        let query: any = {};
        if (paramsStr) {
            const paramPairs = paramsStr.split('&');
            for (const pair of paramPairs) {
                const [key, value] = pair.split('=');
                query[key] = value;
            }
        }
        return {
            path, query
        }

    }
}

export default {
    parseRoute,
    parseHash
}
