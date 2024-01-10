import React, {useContext} from 'react';
import {Internals} from 'remotion';
import {useIsStill} from '../helpers/is-current-selected-still';
import {InitialCompositionLoader} from './InitialCompositionLoader';
import {MenuToolbar} from './MenuToolbar';
import {SplitterContainer} from './Splitter/SplitterContainer';
import {SplitterElement} from './Splitter/SplitterElement';
import {SplitterHandle} from './Splitter/SplitterHandle';
import {Timeline} from './Timeline/Timeline';
import {TopPanel} from './TopPanel';

const noop = () => undefined;

export const EditorContent: React.FC = () => {
	const isStill = useIsStill();
	const {canvasContent} = useContext(Internals.CompositionManager);

	// Preventing multiple renders so the update check doesn't get rendered twice and needs to be aborted
	const onlyTopPanel =
		canvasContent === null || isStill || canvasContent.type !== 'composition';

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
			}}
		>
			<InitialCompositionLoader />
			<MenuToolbar />
			{onlyTopPanel ? (
				<TopPanel />
			) : (
				<SplitterContainer
					orientation="horizontal"
					id="top-to-bottom"
					maxFlex={0.9}
					minFlex={0.2}
					defaultFlex={0.75}
				>
					<SplitterElement sticky={null} type="flexer">
						<TopPanel />
					</SplitterElement>
					<SplitterHandle allowToCollapse="none" onCollapse={noop} />
					<SplitterElement sticky={null} type="anti-flexer">
						<Timeline />
					</SplitterElement>
				</SplitterContainer>
			)}
		</div>
	);
};
