import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.local`});

console.log(dotenv);

const env:any = process.env;
const aoss_server = env.AOSS_SERVICE_URL;


const getAossServer = () => {
	let proxyServer:any = {
		target: aoss_server,
		changeOrigin: true,
		rewrite: (path: any): string => {
			console.log("请求路径", `/platform/console${path}`);
			return `/platform/console${path}`
		}
	}
	proxyServer.headers = {
		"Authorization": env.AOSS_TOKEN
	}
	console.log('跳转地址：', proxyServer)
	return proxyServer;
}

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 3000,       // 可以根据需要修改端口号,
		proxy: {
			'/webservice': getAossServer()
		}
	}
};

export default config;
