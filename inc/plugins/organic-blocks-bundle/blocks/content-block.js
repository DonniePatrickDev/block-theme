(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var InspectorControls = wp.blockEditor.InspectorControls
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
  var featuredTemplate = [
    ['core/cover', { className: 'obb-featured-cover', url: js_img_data.default_image_url, minHeight: 280, dimRatio: 40 }, [
      ['core/heading', { level: 3, placeholder: 'Featured Content', fontSize: 'large', textAlign: 'center', textColor: 'white' }]
    ]],
    ['core/group', { className: 'obb-featured-content' }, [
      ['core/paragraph', { placeholder: 'The Featured Content Block displays a group of editable content types within a featured section.', align: 'center' }],
      ['core/buttons', { contentJustification: 'center' }, [
        ['core/button', { placeholder: 'Example Button', width: 100 }]
      ]]
    ]]
  ]

  // Create custom Content Slideshow icon SVG.
  const featuredIcon = el('svg',
    {
      class: 'organic-featured-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M6 7h7v1h-7v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M6 9h10v1h-10v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M6 11h8v1h-8v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M24 8.916c0-0.509-0.2-0.991-0.563-1.353-0.747-0.747-1.959-0.747-2.706 0l-0.731 0.731v-5.294c0-1.103-0.897-2-2-2h-2v-1h-1v1h-2v-1h-1v1h-2v-1h-1v1h-2v-1h-1v1h-2c-1.103 0-2 0.897-2 2v19c0 1.103 0.897 2 2 2h14c1.103 0 2-0.897 2-2v-8.294l3.438-3.438c0.363-0.363 0.563-0.844 0.563-1.353zM15.753 16.541l-1.616 0.322 0.322-1.616 6.041-6.041 1.294 1.294-6.041 6.041zM4 22v-19h2v2h1v-2h2v2h1v-2h2v2h1v-2h2v2h1v-2h2v7.294l-4.353 4.353c-0.069 0.069-0.119 0.159-0.138 0.256l-0.5 2.5c-0.031 0.162 0.019 0.334 0.138 0.453 0.094 0.094 0.222 0.147 0.353 0.147 0.031 0 0.066-0.003 0.097-0.009l2.5-0.5c0.097-0.019 0.184-0.066 0.256-0.138l1.647-1.647v6.291h-14zM22.731 9.563l-0.231 0.231-1.294-1.294 0.231-0.231c0.356-0.356 0.938-0.356 1.294 0 0.172 0.172 0.269 0.403 0.269 0.647s-0.097 0.472-0.269 0.647z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M6 13h6v1h-6v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M6 16h5v1h-5v-1z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M6 18h6v1h-6v-1z'
        }
      )
    )
  )

  const organicContentBlock = registerBlockType('obb/content-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Featured Content', 'obb'), // The title of our block.
    description: __('Quickly create featured content sections.', 'obb'), // The description of our block.
    icon: featuredIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
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
        default: 24
      },
      styleborderwidth: {
        type: 'number',
        default: 1
      },
      stylebordercolor: {
        type: 'string',
        default: '#ccc'
      },
      styleshadowcolor: {
        type: 'string',
        default: ''
      },
      bgcolor: {
        type: 'string',
        default: '#f4f4f4'
      },
      bggradient: {
        type: 'string'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
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

      return [
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
            className: 'organic-block obb-featured ' + props.className + resetMobileClass,
            style: {
              zIndex: attributes.stylescale > 1 ? 8 : 4,
              transform: attributes.stylescale !== 1 ? 'scale(' + attributes.stylescale + ')' : null,
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 && attributes.styleshadowcolor !== '' ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el(InnerBlocks, { template: featuredTemplate })
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
            className: 'organic-block obb-featured' + resetMobileClass,
            style: {
              zIndex: attributes.stylescale > 1 ? 8 : 4,
              transform: attributes.stylescale !== 1 ? 'scale(' + attributes.stylescale + ')' : null,
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 && attributes.styleshadowcolor !== '' ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el(InnerBlocks.Content)
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
