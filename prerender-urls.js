const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');
const parseMD = require('parse-md').default;

const [blogs] = generateFileList(join(__dirname, 'content')).nodes;
const [,dailies] = generateFileList(join(__dirname, 'content')).nodes;
module.exports = () => {
	const pages = [
		{
			url: '/',
			seo: {
				cover: '/assets/profile.jpg'
			}
		},
		{ url: '/contact/' },
		{ url: '/contact/success' }
	];

	//adding dailies list posts page
	pages.push({
		url: '/dailies/',
		data: dailies
	});

	// adding all dailes pages
	pages.push(...dailies.edges.map(daily => {
		let data;
		if (daily.format === 'md') {
			const { content } = parseMD(fs.readFileSync(join('content', 'daily', daily.id), 'utf-8'));
			data = content;
		}
		else {
			data = fs.readFileSync(join('content', 'daily', daily.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
		}
		return {
			url: `/daily/${daily.id}`,
			seo: daily.details,
			data: {
				details: daily.details,
				content: data
			}
		};
	}));

	// adding blogs list posts page
	pages.push({
		url: '/blogs/',
		data: blogs
	});

	// adding all blog pages
	pages.push(...blogs.edges.map(blog => {
		let data;
		if (blog.format === 'md') {
			const { content } = parseMD(fs.readFileSync(join('content', 'blog', blog.id), 'utf-8'));
			data = content;
		}
		else {
			data = fs.readFileSync(join('content', 'blog', blog.id), 'utf-8').replace(/---(.*(\r)?\n)*---/, '');
		}
		return {
			url: `/blog/${blog.id}`,
			seo: blog.details,
			data: {
				details: blog.details,
				content: data
			}
		};
	}));

	return pages;
};
