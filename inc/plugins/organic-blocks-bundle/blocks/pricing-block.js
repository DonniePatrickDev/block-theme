(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
  var ToggleControl = components.ToggleControl
  var PanelBody = components.PanelBody

  // Dropdown Options
  var obbColors = [
    { name: __('White', 'obb'), color: '#fff' },
    { name: __('Black', 'obb'), color: '#000' },
    { name: __('Light Gray', 'obb'), color: '#eee' },
    { name: __('Medium Gray', 'obb'), color: '#808080' },
    { name: __('Brown', 'obb'), color: '#996633' },
    { name: __('Red', 'obb'), color: '#f00' },
    { name: __('Blue', 'obb'), color: '#006699' },
    { name: __('Green', 'obb'), color: '#99cc33' },
    { name: __('Pink', 'obb'), color: '#ff33cc' },
    { name: __('Teal', 'obb'), color: '#00cccc' },
    { name: __('Gold', 'obb'), color: '#cc9900' },
    { name: __('Purple', 'obb'), color: '#660099' }
  ]
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(225deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
      slug: 'california-dusk'
    },
    {
      name: 'Subtle Teal',
      gradient: 'linear-gradient(135deg, rgb(0, 219, 255), rgb(0, 197, 93) 100%)',
      slug: 'subtle-teal'
    },
    {
      name: 'Tokyo Sunset',
      gradient: 'linear-gradient(135deg, rgb(255, 0, 116), rgb(0, 40, 205) 100%)',
      slug: 'tokyo-sunset'
    },
    {
      name: 'Fire Blaze',
      gradient: 'linear-gradient(135deg, rgb(244, 182, 0), rgb(200, 0, 0) 100%)',
      slug: 'fire-blaze'
    },
    {
      name: 'Lime Light',
      gradient: 'linear-gradient(320deg, rgb(151, 236, 5), rgb(251, 230, 0) 100%)',
      slug: 'lime-light'
    }
  ]
  var pricingTemplate = [
    ['core/group', { className: 'obb-pricing-header', gradient: 'luminous-dusk' }, [
      ['core/image', { className: 'obb-pricing-icon', url: js_icon_data.default_icon_url, width: 32, height: 32, align: 'center' }],
      ['core/paragraph', { className: 'obb-pricing-price', fontSize: 'huge', placeholder: '$99', textColor: 'white' }],
      ['core/heading', { className: 'obb-pricing-title', level: 6, fontSize: 'medium', placeholder: 'Package Title', textColor: 'white' }],
      ['core/paragraph', { placeholder: 'Enter your pricing table description.', textColor: 'white' }]
    ]],
    ['core/group', { className: 'obb-pricing-body' }, [
      ['core/list', { className: 'obb-pricing-list', placeholder: 'Enter your list item.' }]
    ]],
    ['core/group', { className: 'obb-pricing-footer' }, [
      ['core/buttons', { className: 'obb-pricing-buttons', contentJustification: 'center' }, [
        ['core/button', { placeholder: 'Sign Up', align: 'center' }]
      ]]
    ]]
  ]

  // Create custom Content Slideshow icon SVG.
  const pricingIcon = el('svg',
    {
      class: 'organic-pricing-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M19 1h-14c-2.756 0-5 2.244-5 5v4.5c0 0.275 0.225 0.5 0.5 0.5h2c0.078 0 0.153-0.019 0.225-0.053l1.775-0.888 1.775 0.888c0.072 0.034 0.147 0.053 0.225 0.053s0.153-0.019 0.225-0.053l1.275-0.637v12.191c0 0.275 0.225 0.5 0.5 0.5h2c0.078 0 0.153-0.019 0.225-0.053l1.775-0.888 1.775 0.888c0.141 0.072 0.306 0.072 0.447 0l1.775-0.888 1.775 0.888c0.072 0.034 0.147 0.053 0.225 0.053s0.153-0.019 0.225-0.053l1.775-0.888 1.775 0.888c0.069 0.034 0.147 0.053 0.225 0.053h1c0.275 0 0.5-0.225 0.5-0.5v-16.5c0.003-2.756-2.241-5-4.997-5zM6.5 9.941l-1.775-0.888c-0.141-0.072-0.306-0.072-0.447 0l-1.897 0.947h-0.381v-4c0-1.653 1.347-3 3-3s3 1.347 3 3v3.191l-1.5 0.75zM20.275 21.053l-1.775 0.888-1.775-0.888c-0.141-0.072-0.306-0.072-0.447 0l-1.778 0.888-1.775-0.888c-0.141-0.072-0.306-0.072-0.447 0l-1.897 0.947h-0.381v-16c0-1.125-0.372-2.163-1.003-3h10.003c1.653 0 3 1.347 3 3v15.691l-1.275-0.637c-0.141-0.072-0.309-0.072-0.45 0z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M12 6h8v1h-8v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M12 6h8v1h-8v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M17 10h-1v2h-0.5c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5h2c0.275 0 0.5 0.225 0.5 0.5s-0.225 0.5-0.5 0.5h-3.5v1h2v2h1v-2h0.5c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5h-2c-0.275 0-0.5-0.225-0.5-0.5s0.225-0.5 0.5-0.5h3.5v-1h-2v-2z'
        }
      )
    )
  )

  const organicPricingBlock = registerBlockType('obb/pricing-block', {
    title: __('Pricing Table', 'obb'),
    description: __('Create content within a pricing table.', 'obb'),
    icon: pricingIcon,
    category: 'organic-blocks',
    supports: {
      align: true,
      alignWide: true,
      anchor: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    styles: [
      {
        name: 'obb-default',
        label: __('Default', 'obb'),
        isDefault: true
      },
      {
        name: 'obb-check-icons',
        label: __('Check Icons', 'obb')
      },
      {
        name: 'obb-check-circle-icons',
        label: __('Check Circle Icons', 'obb')
      },
      {
        name: 'obb-star-icons',
        label: __('Star Icons', 'obb')
      }
    ],
    attributes: { // Necessary for saving block content.
      stylescale: {
        type: 'number',
        default: 1
      },
      resetmobile: {
        type: 'boolean',
        default: true
      },
      styleradius: {
        type: 'number',
        default: 6
      },
      styleshadow: {
        type: 'number',
        default: 12
      },
      styleborderwidth: {
        type: 'number',
        default: 0
      },
      stylebordercolor: {
        type: 'string',
        default: '#ccc'
      },
      styleshadowcolor: {
        type: 'string'
      },
      bgcolor: {
        type: 'string',
        default: '#f4f4f4'
      },
      bggradient: {
        type: 'string'
      },
      alignment: {
        type: 'string',
        default: 'center'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var alignment = props.attributes.alignment
      var stylescale = props.attributes.stylescale
      var resetmobile = props.attributes.resetmobile
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient
      var resetMobileClass = props.attributes.resetmobile === true ? ' obb-mobile-reset' : ''

      function onChangeAlignment (newAlignment) {
        props.setAttributes({ alignment: newAlignment })
      }

      return [
        el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
          // Display alignment toolbar within block controls.
          el(AlignmentToolbar, {
            value: alignment,
            onChange: onChangeAlignment
          })
        ),
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(RangeControl, {
              label: __('Scale', 'obb'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 1,
              min: 0.1,
              max: 2,
              step: 0.01,
              value: stylescale,
              onChange: function (val) { props.setAttributes({ stylescale: val }) }
            }),
            el(ToggleControl, {
              label: __('Reset Scale In Mobile', 'obb'),
              checked: resetmobile,
              onChange: function (val) { props.setAttributes({ resetmobile: val }) }
            })
          ),
          el(PanelColorSettings, {
            title: __('Background', 'obb'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Background Color', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: bgcolor,
                gradientValue: bggradient,
                onChange: function (val) { props.setAttributes({ bgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ bggradient: val }) }
              },
              {
                label: __('Border Color', 'obb'),
                colors: colorOptions,
                value: stylebordercolor,
                onChange: function (val) { props.setAttributes({ stylebordercolor: val }) }
              },
              {
                label: __('Shadow Color', 'obb'),
                colors: colorOptions,
                value: styleshadowcolor,
                onChange: function (val) { props.setAttributes({ styleshadowcolor: val }) }
              }
            ]
          },
          el(RangeControl, {
            label: __('Border Radius', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleradius,
            onChange: function (val) { props.setAttributes({ styleradius: val }) }
          }),
          el(RangeControl, {
            label: __('Border Width', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 20,
            step: 1,
            value: styleborderwidth,
            onChange: function (val) { props.setAttributes({ styleborderwidth: val }) }
          }),
          el(RangeControl, {
            label: __('Shadow Size', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleshadow,
            onChange: function (val) { props.setAttributes({ styleshadow: val }) }
          })
          )
        ),
        el('div',
          {
            className: 'organic-block obb-pricing' + ' obb-align-' + attributes.alignment + resetMobileClass + ' ' + props.className,
            style: {
              textAlign: attributes.alignment,
              transform: 'scale(' + attributes.stylescale + ')',
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#f4f4f4',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null,
              zIndex: attributes.stylescale > 1 ? '8' : '4'
            }
          },
          el('div',
            {
              className: 'obb-pricing-content'
            },
            el(InnerBlocks, { template: pricingTemplate, style: { textAlign: attributes.alignment } } // templateLock: 'insert', allowedBlocks: nestedBlocks
            )
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes
      var resetMobileClass = attributes.resetmobile === true ? ' obb-mobile-reset' : ''

      return (
        el('div',
          {
            className: 'organic-block obb-pricing' + ' obb-align-' + attributes.alignment + resetMobileClass,
            style: {
              transform: 'scale(' + attributes.stylescale + ')',
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#f4f4f4',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null,
              zIndex: attributes.stylescale > 1 ? '8' : '4'
            }
          },
          el('div', { className: 'obb-pricing-content', style: { textAlign: attributes.alignment } },
            el(InnerBlocks.Content)
          )
        )
      )
    }
  })
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
