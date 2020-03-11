import { h } from 'preact';
import { Link } from 'preact-router';
import { usePrerenderData } from '@preact/prerender-data-provider';
import style from './style';

const dailies = (props) => {
	const [data, isLoading] = usePrerenderData(props);
	return (
		<div class={style.pageDailies}>
			<h1 class={style.pageTitle}>My Daily Experiments</h1>
			{ getDailiesListing(data, isLoading) }
		</div>
	);
};

function getDailiesListing(data, isLoading) {
    console.log('data',data)
	if (isLoading) {
		return (
			<article class={style.loadingPlaceholder}>
				<h2 class={`${style.dailytitle} loading`}>&nbsp;</h2>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
				<div class={`${style.loadingBody} loading`}>&nbsp;</div>
			</article>
		);
	}
	if (data && data.data) {
		const { data: dailies } = data;
		return (
			<>'			'{dailies.edges.map(daily => (
				<Link href={`/daily/${daily.id}`}>
					<article>
						<h2>{daily.details.title}</h2>
						<div>
							{
								(daily.details.tags.substr(1, daily.details.tags.length - 2).split(',') || []).map(tag => <span class={style.tag}>{tag}</span>)
							}
						</div>
						<p class={style.preview}>
							{daily.preview}
						</p>
					</article>
				</Link>
			))}'		'</>
		);
	}
}

export default dailies;
