(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var RichText = wp.blockEditor.RichText
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var InspectorControls = wp.blockEditor.InspectorControls
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var ToggleControl = components.ToggleControl
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
  var toggleTemplate = [
    ['core/paragraph', { placeholder: 'Enter your toggle content.' }]
  ]

  // Create custom Content Slideshow icon SVG.
  const toggleIcon = el('svg',
    {
      class: 'organic-toggle-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22 0h-20c-1.103 0-2 0.897-2 2v20c0 1.103 0.897 2 2 2h20c1.103 0 2-0.897 2-2v-20c0-1.103-0.897-2-2-2zM22 22h-20v-20h20v20c0.003 0 0 0 0 0z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M20.5 3h-17c-0.275 0-0.5 0.225-0.5 0.5v17c0 0.275 0.225 0.5 0.5 0.5h17c0.275 0 0.5-0.225 0.5-0.5v-17c0-0.275-0.225-0.5-0.5-0.5zM20 20h-16v-16h16v16z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M11 16h2v-3h3v-2h-3v-3h-2v3h-3v2h3z'
        }
      )
    )
  )

  const organicToggleBlock = registerBlockType('obb/toggle-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Toggle', 'obb'), // The title of our block.
    description: __('Create content within a toggle element.', 'obb'), // The description of our block.
    icon: toggleIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
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
        name: 'obb-modern',
        label: __('Modern', 'obb')
      },
      {
        name: 'obb-bordered',
        label: __('Bordered', 'obb')
      },
      {
        name: 'obb-rounded',
        label: __('Rounded', 'obb')
      }
    ],
    attributes: { // Necessary for saving block content.
      title: {
        type: 'array',
        source: 'children',
        selector: '.obb-toggle-title'
      },
      // togglestyle: {
      //   type: 'string',
      //   default: 'minimal'
      // },
      toggleopen: {
        type: 'boolean',
        default: false
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
      titlecolor: {
        type: 'string',
        default: '#333'
      },
      iconcolor: {
        type: 'string',
        default: '#999'
      },
      triggerbgcolor: {
        type: 'string',
        default: '#f4f4f4'
      },
      triggerbggradient: {
        type: 'string'
      },
      contentbgcolor: {
        type: 'string',
        default: '#f4f4f4'
      },
      contentbggradient: {
        type: 'string'
      },
      alignment: {
        type: 'string',
        default: 'left'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var alignment = props.attributes.alignment
      // var togglestyle = props.attributes.togglestyle
      var toggleopen = props.attributes.toggleopen
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var titlecolor = props.attributes.titlecolor
      var iconcolor = props.attributes.iconcolor
      var triggerbgcolor = props.attributes.triggerbgcolor
      var triggerbggradient = props.attributes.triggerbggradient
      var contentbgcolor = props.attributes.contentbgcolor
      var contentbggradient = props.attributes.contentbggradient

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
            el(ToggleControl, {
              label: __('Toggle Open', 'obb'),
              help: __('The toggle starts in the open state.', 'obb'),
              checked: toggleopen,
              onChange: function (val) { props.setAttributes({ toggleopen: val }) }
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
                colors: colorOptions,
                label: __('Title Color', 'obb'),
                value: titlecolor,
                onChange: function (val) { props.setAttributes({ titlecolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Icon Color', 'obb'),
                value: iconcolor,
                onChange: function (val) { props.setAttributes({ iconcolor: val }) }
              },
              {
                label: __('Content Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: contentbgcolor,
                gradientValue: contentbggradient,
                onChange: function (val) { props.setAttributes({ contentbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ contentbggradient: val }) }
              },
              {
                label: __('Trigger Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: triggerbgcolor,
                gradientValue: triggerbggradient,
                onChange: function (val) { props.setAttributes({ triggerbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ triggerbggradient: val }) }
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
            className: 'organic-block obb-toggle ' + props.className,
            style: {
              textAlign: attributes.alignment,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('div',
            {
              className: 'obb-toggle-trigger active',
              style: {
                backgroundColor: attributes.triggerbgcolor ? attributes.triggerbgcolor : '#f4f4f4',
                backgroundImage: attributes.triggerbggradient ? attributes.triggerbggradient : null
              }
            },
            attributes.title && el(RichText, {
              key: 'editable',
              className: 'obb-toggle-title',
              tagName: 'p',
              style: { color: attributes.titlecolor },
              placeholder: __('Toggle Title', 'obb'),
              keepPlaceholderOnFocus: true,
              value: attributes.title,
              onChange: function (newTitle) {
                props.setAttributes({ title: newTitle })
              }
            }),
            el('i', { className: 'obb-toggle-icon obb-open fas fa-plus', style: { color: attributes.iconcolor } }),
            el('i', { className: 'obb-toggle-icon obb-close fas fa-minus', style: { color: attributes.iconcolor } })
          ),
          el('div',
            {
              className: 'obb-toggle-container',
              style: {
                textAlign: alignment,
                backgroundColor: attributes.contentbgcolor ? attributes.contentbgcolor : '#f4f4f4',
                backgroundImage: attributes.contentbggradient ? attributes.contentbggradient : null
              }
            },
            el('div', { className: 'obb-toggle-content', style: { borderColor: attributes.stylebordercolor ? attributes.stylebordercolor : null } },
              el(InnerBlocks, { template: toggleTemplate })
            )
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes
      var toggleOpenClass = props.attributes.toggleopen === true ? ' active' : ''

      return (
        el('div',
          {
            className: 'organic-block obb-toggle',
            style: {
              textAlign: attributes.alignment,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('div',
            {
              className: 'obb-toggle-trigger' + toggleOpenClass,
              style: {
                backgroundColor: attributes.triggerbgcolor ? attributes.triggerbgcolor : '#f4f4f4',
                backgroundImage: attributes.triggerbggradient ? attributes.triggerbggradient : null
              }
            },
            attributes.title && el(RichText.Content, {
              className: 'obb-toggle-title',
              tagName: 'p',
              style: { color: attributes.titlecolor },
              value: attributes.title
            }),
            el('i', { className: 'obb-toggle-icon obb-open fas fa-plus', style: { color: attributes.iconcolor } }),
            el('i', { className: 'obb-toggle-icon obb-close fas fa-minus', style: { color: attributes.iconcolor } })
          ),
          el('div',
            {
              className: 'obb-toggle-container',
              style: {
                textAlign: attributes.alignment,
                backgroundColor: attributes.contentbgcolor ? attributes.contentbgcolor : '#f4f4f4',
                backgroundImage: attributes.contentbggradient ? attributes.contentbggradient : null
              }
            },
            el('div', { className: 'obb-toggle-content', style: { borderColor: attributes.stylebordercolor ? attributes.stylebordercolor : null } },
              el(InnerBlocks.Content)
            )
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
