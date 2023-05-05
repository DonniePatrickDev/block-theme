(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var InspectorControls = wp.blockEditor.InspectorControls
  var RangeControl = components.RangeControl
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
  var UnitControl = components.__experimentalUnitControl
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
  var unitTypes = [
    { value: 'px', label: 'px', default: 0 },
    { value: '%', label: '%', default: 0 },
    { value: 'em', label: 'em', default: 0 }
  ]
  var calloutTemplate = [
    ['core/group', { className: 'obb-callout-content' }, [
      ['core/columns', { columns: 2, verticalAlignment: 'center' }, [
        ['core/column', { width: '50%' }, [
          ['core/image', { url: js_graphic_data.callout_graphic_url }]
        ]],
        ['core/column', { width: '50%' }, [
          ['core/heading', { level: 2, placeholder: 'Callout Block', textColor: 'white' }],
          ['core/paragraph', { placeholder: 'The Callout Block is used to place emphasis on content within your WordPress page or post.', textColor: 'white' }],
          ['core/buttons', { itemsJustification: 'left' }, [
            ['core/button', { placeholder: 'Example Button' }]
          ]]
        ]]
      ]]
    ]]
  ]

  // Create custom Content Slideshow icon SVG.
  const calloutIcon = el('svg',
    {
      class: 'organic-callout-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M23.438 10.725l-10.163-10.163c-0.747-0.75-1.966-0.75-2.712 0v0c-0.534 0.534-0.687 1.313-0.456 1.984l-8.7 15.469c-0.066-0.009-0.131-0.016-0.197-0.016 0 0-0.003 0-0.003 0-0.322 0-0.625 0.128-0.853 0.356-0.228 0.231-0.353 0.534-0.353 0.859 0 0.322 0.128 0.625 0.356 0.85l3.578 3.578c0.228 0.228 0.534 0.356 0.856 0.356 0 0 0.003 0 0.003 0 0.322 0 0.625-0.128 0.85-0.356 0.231-0.231 0.356-0.534 0.356-0.859 0-0.066-0.006-0.128-0.016-0.191l2.497-1.403 1.084 1.084c0.478 0.478 1.113 0.725 1.756 0.725 0.428 0 0.859-0.109 1.25-0.337l3.719-2.169c0.369-0.213 0.619-0.578 0.691-0.997s-0.047-0.844-0.325-1.169l-1.006-1.172 5.8-3.263c0.203 0.069 0.416 0.106 0.628 0.106 0.491 0 0.981-0.188 1.356-0.563 0.753-0.747 0.753-1.966 0.003-2.712zM9.647 12.191l3.881-5.95 6.284 6.284-15.094 8.484-1.728-1.728 8.484-15.091 1.328 1.328-3.994 6.128 0.837 0.544zM4.934 22.941c-0.050 0.053-0.112 0.059-0.144 0.059v0c-0.031 0-0.094-0.009-0.15-0.063l-3.581-3.581c-0.053-0.050-0.059-0.112-0.059-0.144s0.009-0.097 0.063-0.15c0 0 0 0 0.003-0.003 0.050-0.053 0.112-0.059 0.144-0.059v0c0.031 0 0.094 0.009 0.15 0.063l3.581 3.581c0.053 0.050 0.059 0.112 0.059 0.144s-0.009 0.094-0.066 0.153zM15.897 18.978c0.112 0.131 0.109 0.275 0.097 0.35s-0.056 0.213-0.206 0.3l-3.719 2.169c-0.581 0.337-1.319 0.244-1.794-0.231l-0.884-0.884 5.375-3.022 1.131 1.319zM22.731 12.731c-0.172 0.172-0.403 0.269-0.65 0.269s-0.475-0.097-0.65-0.269l-10.163-10.163c-0.359-0.359-0.359-0.941 0-1.3s0.941-0.359 1.3 0l10.163 10.162c0.172 0.172 0.269 0.403 0.269 0.65s-0.097 0.475-0.269 0.65z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M18.792 4.501l3.708-3.708 0.707 0.707-3.708 3.708-0.707-0.707z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M16.829 2.723l1.353-2.706 0.894 0.447-1.353 2.706-0.894-0.447z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M20.829 6.276l2.706-1.353 0.447 0.894-2.706 1.353-0.447-0.894z'
        }
      )
    )
  )

  const organicCalloutBlock = registerBlockType('obb/callout-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Callout', 'obb'), // The title of our block.
    description: __('A content conatiner with emphasis.', 'obb'), // The description of our block.
    icon: calloutIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: false // Enable padding UI control.
      }
      // color: {
      //   text: true,
      //   background: true,
      //   link: true
      // },
      // border: {
      //   width: true
      // }
    },
    attributes: { // Necessary for saving block content.
      align: {
        type: 'string',
        default: 'wide'
      },
      vertpadding: {
        type: 'string',
        default: '48px'
      },
      horizpadding: {
        type: 'string',
        default: '48px'
      },
      styleradius: {
        type: 'number',
        default: 12
      },
      styleshadow: {
        type: 'number',
        default: 24
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
        default: '#660099'
      },
      bggradient: {
        type: 'string'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var vertpadding = props.attributes.vertpadding
      var horizpadding = props.attributes.horizpadding
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient

      return [
        el(InspectorControls, { key: 'setting' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el(BaseControl,
              {
                help: __('Set the top and bottom padding for the container.', 'obb')
              },
              el(UnitControl, {
                label: __('Vertical Padding', 'obb'),
                type: 'number',
                min: 0,
                units: unitTypes,
                value: vertpadding,
                onChange: function (val) { props.setAttributes({ vertpadding: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Set the left and right padding for the container.', 'obb')
              },
              el(UnitControl, {
                label: __('Horizontal Padding', 'obb'),
                type: 'number',
                min: 0,
                units: unitTypes,
                value: horizpadding,
                onChange: function (val) { props.setAttributes({ horizpadding: val }) }
              })
            )
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
            className: 'organic-block obb-callout',
            style: {
              // background: attributes.bgcolor ? attributes.bgcolor : attributes.bggradient, // Apply this method if default gradient value exists.
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#660099',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              paddingTop: attributes.vertpadding,
              paddingBottom: attributes.vertpadding,
              paddingLeft: attributes.horizpadding,
              paddingRight: attributes.horizpadding,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el(InnerBlocks, { template: calloutTemplate })
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes

      return (
        el('div',
          {
            className: 'organic-block obb-callout',
            style: {
              // background: attributes.bgcolor ? attributes.bgcolor : attributes.bggradient, // Apply this method if default gradient value exists.
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#660099',
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              paddingTop: attributes.vertpadding,
              paddingBottom: attributes.vertpadding,
              paddingLeft: attributes.horizpadding,
              paddingRight: attributes.horizpadding,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
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
