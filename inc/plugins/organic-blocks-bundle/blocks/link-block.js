(function (blocks, editor, components, i18n, element) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var InspectorControls = wp.blockEditor.InspectorControls
  var SelectControl = components.SelectControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorIndicator = components.ColorIndicator
  var ColorPalette = components.ColorPalette
  var BaseControl = components.BaseControl
  var PanelBody = components.PanelBody
  var ToggleControl = components.ToggleControl
  var TextControl = components.TextControl

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
  var styleOptions = [
    { label: __('Minimal', 'obb'), value: 'minimal' },
    { label: __('Modern', 'obb'), value: 'modern' },
    { label: __('Bordered', 'obb'), value: 'bordered' },
    { label: __('Rounded', 'obb'), value: 'rounded' }
  ]
  var linkTemplate = [
    ['core/spacer', { height: '40px' }],
    ['core/heading', { level: 4, placeholder: 'This Is A Link', textAlign: 'center' }],
    ['core/paragraph', { placeholder: 'The Link Container Block wraps all content in a clickable link. Modify or replace the content within this block, and add your link in the block settings.', align: 'center' }],
    ['core/spacer', { height: '40px' }]
  ]

  // Create custom Content Slideshow icon SVG.
  const linkIcon = el('svg',
    {
      class: 'organic-link-icon',
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
          d: 'M12,13.6c0,0.4-0.2,0.8-0.5,1.1l-0.8,0.8c-0.6,0.6-1.7,0.6-2.3,0c-0.6-0.6-0.6-1.7,0-2.3l0.8-0.8c0.3-0.3,0.7-0.5,1.1-0.5h0.1v-1h-0.1c-0.7,0-1.4,0.3-1.9,0.8l-0.8,0.8c-1,1-1,2.7,0,3.7C8.3,16.7,9,17,9.6,17c0.7,0,1.3-0.3,1.9-0.8l0.8-0.8c0.5-0.5,0.8-1.2,0.8-1.9v-0.1h-1L12,13.6L12,13.6z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M16.2,7.8c-1-1-2.7-1-3.7,0l-0.8,0.8C11.3,9,11,9.7,11,10.4v0.1h1v-0.1c0-0.4,0.2-0.8,0.5-1.1l0.8-0.8c0.6-0.6,1.7-0.6,2.3,0c0.6,0.6,0.6,1.7,0,2.3l-0.8,0.8c-0.3,0.3-0.7,0.5-1.1,0.5h-0.1v1h0.1c0.7,0,1.4-0.3,1.9-0.8l0.8-0.8C17.3,10.5,17.3,8.8,16.2,7.8L16.2,7.8z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M10,13.3l3.3-3.3l0.7,0.7L10.7,14C10.7,14,10,13.3,10,13.3z'
        }
      )
    )
  )

  const organicLinkBlock = registerBlockType('obb/link-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Link Container', 'obb'), // The title of our block.
    description: __('Wrap nested blocks within a linkable container.', 'obb'), // The description of our block.
    icon: linkIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
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
              'obb/link-block',
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
      linkurl: {
        type: 'string'
      },
      linktarget: {
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
      bgcolor: {
        type: 'string'
      },
      bggradient: {
        type: 'string'
      },
      bgcolorhover: {
        type: 'string'
      },
      bggradienthover: {
        type: 'string'
      }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var linkurl = props.attributes.linkurl
      var linktarget = props.attributes.linktarget
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bgcolorhover = props.attributes.bgcolorhover
      var bggradient = props.attributes.bggradient
      var bggradienthover = props.attributes.bggradienthover

      return [
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Link', 'obb')
            },
            el(TextControl, {
              label: __('Link Container URL', 'obb'),
              type: 'url',
              value: linkurl,
              onChange: function (val) { props.setAttributes({ linkurl: val }) }
            }),
            el(ToggleControl, {
              label: __('Open in new tab?', 'obb'),
              checked: linktarget,
              onChange: function (val) { props.setAttributes({ linktarget: val }) }
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
              // {
              //   label: __('Background Hover Color', 'obb'),
              //   colors: colorOptions,
              //   gradients: gradientOptions,
              //   value: bgcolorhover,
              //   gradientValue: bggradienthover,
              //   onChange: function (val) { props.setAttributes({ bgcolorhover: val }) },
              //   onGradientChange: function (val) { props.setAttributes({ bggradienthover: val }) }
              // },
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
            className: 'organic-block obb-link',
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('div', { className: 'obb-link-content' },
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
            className: 'organic-block obb-link',
            // onMouseOut: attributes.bgcolor !== '' ? 'this.style.background=' + attributes.bgcolor : null,
            // onMouseOver: attributes.bgcolorhover !== '' ? 'this.style.background=' + attributes.bgcolorhover : null,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : null,
              backgroundImage: attributes.bggradient ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          attributes.linkurl && el('a',
            {
              className: 'obb-link-overlay',
              href: attributes.linkurl,
              target: attributes.linktarget === true ? '_blank' : '',
              rel: 'noopener'
            }
          ),
          el('div', { className: 'obb-link-content' },
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
