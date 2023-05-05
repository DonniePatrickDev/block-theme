(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var InspectorControls = wp.blockEditor.InspectorControls
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
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
  var widthTemplate = [
    ['core/heading', { level: 3, placeholder: 'This Content Has A Defined Width', textAlign: 'center' }],
    ['core/paragraph', { placeholder: 'All content wrapped in the Max Width Container Block can be resized to a specific width. Make sure to adjust the width in the block settings.', align: 'center' }]
  ]

  // Create custom Content Slideshow icon SVG.
  const widthIcon = el('svg',
    {
      class: 'organic-width-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M24,22V2c0-1.1-0.9-2-2-2H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20C23.1,24,24,23.1,24,22z M2,22V2h20v20H2C2,22,2,22,2,22z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M21,20.5v-17C21,3.2,20.8,3,20.5,3h-17C3.2,3,3,3.2,3,3.5v17C3,20.8,3.2,21,3.5,21h17C20.8,21,21,20.8,21,20.5z M4,20V4h16v16H4z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M17.9,11.1l-2.4-2.4l-0.7,0.7l1.5,1.5H14h-4H7.7l1.5-1.5L8.5,8.8l-2.4,2.4C6.1,11.2,6,11.4,6,11.5s0,0.3,0.1,0.4l2.4,2.4l0.7-0.7L7.7,12H10h4h2.3l-1.5,1.5l0.7,0.7l2.4-2.4C18,11.7,18,11.3,17.9,11.1z'
        }
      )
    )
  )

  const organicWidthBlock = registerBlockType('obb/width-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Max Width Container', 'obb'), // The title of our block.
    description: __('Wrap content within a defined width.', 'obb'), // The description of our block.
    icon: widthIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: ['wide', 'full'],
      alignWide: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    transforms: {
      from: [
        {
          type: 'block',
          blocks: ['core/group', 'core/columns'],
          transform: function (attributes, innerBlocks) {
            return createBlock(
              'obb/width-block',
              attributes,
              innerBlocks
            )
          }
        }
      ],
      to: [
        {
          type: 'block',
          blocks: ['*'],
          transform: function (attributes, innerBlocks) {
            return createBlock(
              'core/group',
              attributes,
              innerBlocks
            )
          }
        }
      ]
    },
    attributes: { // Necessary for saving block content.
      alignment: {
        type: 'string',
        default: 'center'
      },
      containerwidth: {
        type: 'number',
        default: 720
      },
      styleradius: {
        type: 'number',
        default: 0
      },
      styleshadow: {
        type: 'number',
        default: 0
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
        type: 'string'
      },
      bggradient: {
        type: 'string'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var containerwidth = props.attributes.containerwidth
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient

      return [
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(RangeControl, {
              label: __('Maximum Width', 'obb'),
              withInputField: true,
              min: 10,
              max: 2400,
              step: 2,
              value: containerwidth,
              onChange: function (val) { props.setAttributes({ containerwidth: val }) }
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
            className: 'organic-block obb-width clearfix',
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              maxWidth: attributes.containerwidth + 'px',
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('div', { className: 'obb-width-content' },
            el(InnerBlocks, { renderAppender: InnerBlocks.ButtonBlockAppender })
          )
        )
      ]
    },

    save: function (props) {
      var attributes = props.attributes

      return (
        el('div',
          {
            className: 'organic-block obb-width clearfix',
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              maxWidth: attributes.containerwidth + 'px',
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('div', { className: 'obb-width-content' },
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
