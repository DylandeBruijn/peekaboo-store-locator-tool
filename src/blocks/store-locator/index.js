import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { width, height, zoom } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Map Settings', 'pslt')}>
                        <TextControl
                            label={__('Width', 'pslt')}
                            value={width}
                            onChange={(value) => setAttributes({ width: value })}
                            help={__('Enter the width of the map (e.g., 100%, 800px)', 'pslt')}
                        />
                        <TextControl
                            label={__('Height', 'pslt')}
                            value={height}
                            onChange={(value) => setAttributes({ height: value })}
                            help={__('Enter the height of the map (e.g., 500px)', 'pslt')}
                        />
                        <RangeControl
                            label={__('Default Zoom Level', 'pslt')}
                            value={zoom}
                            onChange={(value) => setAttributes({ zoom: value })}
                            min={1}
                            max={20}
                            help={__('Set the default zoom level of the map', 'pslt')}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className="pslt-store-locator-block">
                        <div className="pslt-search-container">
                            <form className="pslt-search-form">
                                <div className="pslt-search-field">
                                    <input
                                        type="text"
                                        placeholder={__('Enter your postcode', 'pslt')}
                                        disabled
                                    />
                                    <button
                                        type="button"
                                        className="pslt-search-button"
                                        disabled
                                    >
                                        {__('Find Stores', 'pslt')}
                                    </button>
                                </div>
                                <div className="pslt-filters">
                                    <select disabled>
                                        <option>{__('Within 5 miles', 'pslt')}</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="pslt-container">
                            <div
                                className="pslt-map"
                                style={{
                                    width,
                                    height,
                                    background: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px'
                                }}
                            >
                                {__('Store Locator Map Preview', 'pslt')}
                            </div>
                            <div className="pslt-results">
                                <div className="pslt-results-list">
                                    <div className="pslt-location-item">
                                        <h3>{__('Sample Location', 'pslt')}</h3>
                                        <p>{__('Sample Postcode', 'pslt')}</p>
                                        <p>{__('Sample Description', 'pslt')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}); 