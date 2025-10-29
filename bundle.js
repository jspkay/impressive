(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// GoldenLayout
var GL = require("golden-layout");

var GoldenLayout = GL.GoldenLayout;
window.GoldenLayout = GoldenLayout;

// interact
window.interact = require("interactjs");

// window.sortable = require("html5sortable");

},{"golden-layout":2,"interactjs":35}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualLayout = exports.StyleConstants = exports.EventHub = exports.EventEmitter = exports.LayoutManager = exports.Stack = exports.RowOrColumn = exports.ContentItem = exports.ComponentItem = exports.GoldenLayout = exports.Tab = exports.Header = exports.DragSource = exports.BrowserPopout = exports.ComponentContainer = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./ts/config/config"), exports);
tslib_1.__exportStar(require("./ts/config/resolved-config"), exports);
var component_container_1 = require("./ts/container/component-container");
Object.defineProperty(exports, "ComponentContainer", { enumerable: true, get: function () { return component_container_1.ComponentContainer; } });
var browser_popout_1 = require("./ts/controls/browser-popout");
Object.defineProperty(exports, "BrowserPopout", { enumerable: true, get: function () { return browser_popout_1.BrowserPopout; } });
var drag_source_1 = require("./ts/controls/drag-source");
Object.defineProperty(exports, "DragSource", { enumerable: true, get: function () { return drag_source_1.DragSource; } });
var header_1 = require("./ts/controls/header");
Object.defineProperty(exports, "Header", { enumerable: true, get: function () { return header_1.Header; } });
var tab_1 = require("./ts/controls/tab");
Object.defineProperty(exports, "Tab", { enumerable: true, get: function () { return tab_1.Tab; } });
tslib_1.__exportStar(require("./ts/errors/external-error"), exports);
var golden_layout_1 = require("./ts/golden-layout");
Object.defineProperty(exports, "GoldenLayout", { enumerable: true, get: function () { return golden_layout_1.GoldenLayout; } });
var component_item_1 = require("./ts/items/component-item");
Object.defineProperty(exports, "ComponentItem", { enumerable: true, get: function () { return component_item_1.ComponentItem; } });
var content_item_1 = require("./ts/items/content-item");
Object.defineProperty(exports, "ContentItem", { enumerable: true, get: function () { return content_item_1.ContentItem; } });
var row_or_column_1 = require("./ts/items/row-or-column");
Object.defineProperty(exports, "RowOrColumn", { enumerable: true, get: function () { return row_or_column_1.RowOrColumn; } });
var stack_1 = require("./ts/items/stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return stack_1.Stack; } });
var layout_manager_1 = require("./ts/layout-manager");
Object.defineProperty(exports, "LayoutManager", { enumerable: true, get: function () { return layout_manager_1.LayoutManager; } });
var event_emitter_1 = require("./ts/utils/event-emitter");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return event_emitter_1.EventEmitter; } });
var event_hub_1 = require("./ts/utils/event-hub");
Object.defineProperty(exports, "EventHub", { enumerable: true, get: function () { return event_hub_1.EventHub; } });
tslib_1.__exportStar(require("./ts/utils/i18n-strings"), exports);
var style_constants_1 = require("./ts/utils/style-constants");
Object.defineProperty(exports, "StyleConstants", { enumerable: true, get: function () { return style_constants_1.StyleConstants; } });
tslib_1.__exportStar(require("./ts/utils/types"), exports);
var virtual_layout_1 = require("./ts/virtual-layout");
Object.defineProperty(exports, "VirtualLayout", { enumerable: true, get: function () { return virtual_layout_1.VirtualLayout; } });

},{"./ts/config/config":3,"./ts/config/resolved-config":4,"./ts/container/component-container":5,"./ts/controls/browser-popout":6,"./ts/controls/drag-source":8,"./ts/controls/header":11,"./ts/controls/tab":13,"./ts/errors/external-error":16,"./ts/golden-layout":18,"./ts/items/component-item":19,"./ts/items/content-item":21,"./ts/items/row-or-column":23,"./ts/items/stack":24,"./ts/layout-manager":25,"./ts/utils/event-emitter":28,"./ts/utils/event-hub":29,"./ts/utils/i18n-strings":30,"./ts/utils/style-constants":31,"./ts/utils/types":32,"./ts/virtual-layout":34,"tslib":36}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUndefinableSize = exports.formatSize = exports.parseSize = exports.PopoutLayoutConfig = exports.LayoutConfig = exports.RootItemConfig = exports.RowOrColumnItemConfig = exports.ComponentItemConfig = exports.StackItemConfig = exports.HeaderedItemConfig = exports.ItemConfig = void 0;
const external_error_1 = require("../errors/external-error");
const internal_error_1 = require("../errors/internal-error");
const i18n_strings_1 = require("../utils/i18n-strings");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const resolved_config_1 = require("./resolved-config");
/** @public */
var ItemConfig;
(function (ItemConfig) {
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        switch (itemConfig.type) {
            case types_1.ItemType.ground:
                throw new external_error_1.ConfigurationError('ItemConfig cannot specify type ground', JSON.stringify(itemConfig));
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                return RowOrColumnItemConfig.resolve(itemConfig, rowAndColumnChildLegacySizeDefault);
            case types_1.ItemType.stack:
                return StackItemConfig.resolve(itemConfig, rowAndColumnChildLegacySizeDefault);
            case types_1.ItemType.component:
                return ComponentItemConfig.resolve(itemConfig, rowAndColumnChildLegacySizeDefault);
            default:
                throw new internal_error_1.UnreachableCaseError('UCUICR55499', itemConfig.type);
        }
    }
    ItemConfig.resolve = resolve;
    /** @internal */
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                result[i] = ItemConfig.resolve(content[i], false);
            }
            return result;
        }
    }
    ItemConfig.resolveContent = resolveContent;
    /** @internal */
    function resolveId(id) {
        if (id === undefined) {
            return resolved_config_1.ResolvedItemConfig.defaults.id;
        }
        else {
            if (Array.isArray(id)) {
                if (id.length === 0) {
                    return resolved_config_1.ResolvedItemConfig.defaults.id;
                }
                else {
                    return id[0];
                }
            }
            else {
                return id;
            }
        }
    }
    ItemConfig.resolveId = resolveId;
    /** @internal */
    function resolveSize(size, width, height, rowAndColumnChildLegacySizeDefault) {
        // Remove support for rowAndColumnChildLegacySizeDefault in a major version release
        if (size !== undefined) {
            return parseSize(size, [types_1.SizeUnitEnum.Percent, types_1.SizeUnitEnum.Fractional]);
        }
        else {
            if (width !== undefined || height !== undefined) {
                if (width !== undefined) {
                    return { size: width, sizeUnit: types_1.SizeUnitEnum.Percent };
                }
                else {
                    if (height !== undefined) {
                        return { size: height, sizeUnit: types_1.SizeUnitEnum.Percent };
                    }
                    else {
                        throw new internal_error_1.UnexpectedUndefinedError('CRS33390');
                    }
                }
            }
            else {
                if (rowAndColumnChildLegacySizeDefault) {
                    return { size: 50, sizeUnit: types_1.SizeUnitEnum.Percent };
                }
                else {
                    return { size: resolved_config_1.ResolvedItemConfig.defaults.size, sizeUnit: resolved_config_1.ResolvedItemConfig.defaults.sizeUnit };
                }
            }
        }
    }
    ItemConfig.resolveSize = resolveSize;
    /** @internal */
    function resolveMinSize(minSize, minWidth, minHeight) {
        if (minSize !== undefined) {
            return parseSize(minSize, [types_1.SizeUnitEnum.Pixel]);
        }
        else {
            const minWidthDefined = minWidth !== undefined;
            const minHeightDefined = minHeight !== undefined;
            if (minWidthDefined || minHeightDefined) {
                if (minWidthDefined) {
                    return { size: minWidth, sizeUnit: types_1.SizeUnitEnum.Pixel };
                }
                else {
                    return { size: minHeight, sizeUnit: types_1.SizeUnitEnum.Pixel };
                }
            }
            else {
                return { size: resolved_config_1.ResolvedItemConfig.defaults.minSize, sizeUnit: resolved_config_1.ResolvedItemConfig.defaults.minSizeUnit };
            }
        }
    }
    ItemConfig.resolveMinSize = resolveMinSize;
    /** @internal */
    function calculateSizeWidthHeightSpecificationType(config) {
        if (config.size !== undefined) {
            return 1 /* Size */;
        }
        else {
            if (config.width !== undefined || config.height !== undefined) {
                return 2 /* WidthOrHeight */;
            }
            else {
                return 0 /* None */;
            }
        }
    }
    ItemConfig.calculateSizeWidthHeightSpecificationType = calculateSizeWidthHeightSpecificationType;
    function isGround(config) {
        return config.type === types_1.ItemType.ground;
    }
    ItemConfig.isGround = isGround;
    function isRow(config) {
        return config.type === types_1.ItemType.row;
    }
    ItemConfig.isRow = isRow;
    function isColumn(config) {
        return config.type === types_1.ItemType.column;
    }
    ItemConfig.isColumn = isColumn;
    function isStack(config) {
        return config.type === types_1.ItemType.stack;
    }
    ItemConfig.isStack = isStack;
    function isComponent(config) {
        return config.type === types_1.ItemType.component;
    }
    ItemConfig.isComponent = isComponent;
})(ItemConfig = exports.ItemConfig || (exports.ItemConfig = {}));
/** @public */
var HeaderedItemConfig;
(function (HeaderedItemConfig) {
    const legacyMaximisedId = '__glMaximised';
    let Header;
    (function (Header) {
        function resolve(header, hasHeaders) {
            var _a;
            if (header === undefined && hasHeaders === undefined) {
                return undefined;
            }
            else {
                const result = {
                    show: (_a = header === null || header === void 0 ? void 0 : header.show) !== null && _a !== void 0 ? _a : (hasHeaders === undefined ? undefined : hasHeaders ? resolved_config_1.ResolvedLayoutConfig.Header.defaults.show : false),
                    popout: header === null || header === void 0 ? void 0 : header.popout,
                    maximise: header === null || header === void 0 ? void 0 : header.maximise,
                    close: header === null || header === void 0 ? void 0 : header.close,
                    minimise: header === null || header === void 0 ? void 0 : header.minimise,
                    tabDropdown: header === null || header === void 0 ? void 0 : header.tabDropdown,
                };
                return result;
            }
        }
        Header.resolve = resolve;
    })(Header = HeaderedItemConfig.Header || (HeaderedItemConfig.Header = {}));
    /** @internal */
    function resolveIdAndMaximised(config) {
        let id;
        // To support legacy configs with Id saved as an array of string, assign config.id to a type which includes string array
        let legacyId = config.id;
        let legacyMaximised = false;
        if (legacyId === undefined) {
            id = resolved_config_1.ResolvedItemConfig.defaults.id;
        }
        else {
            if (Array.isArray(legacyId)) {
                const idx = legacyId.findIndex((id) => id === legacyMaximisedId);
                if (idx > 0) {
                    legacyMaximised = true;
                    legacyId = legacyId.splice(idx, 1);
                }
                if (legacyId.length > 0) {
                    id = legacyId[0];
                }
                else {
                    id = resolved_config_1.ResolvedItemConfig.defaults.id;
                }
            }
            else {
                id = legacyId;
            }
        }
        let maximised;
        if (config.maximised !== undefined) {
            maximised = config.maximised;
        }
        else {
            maximised = legacyMaximised;
        }
        return { id, maximised };
    }
    HeaderedItemConfig.resolveIdAndMaximised = resolveIdAndMaximised;
})(HeaderedItemConfig = exports.HeaderedItemConfig || (exports.HeaderedItemConfig = {}));
/** @public */
var StackItemConfig;
(function (StackItemConfig) {
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        var _a, _b;
        const { id, maximised } = HeaderedItemConfig.resolveIdAndMaximised(itemConfig);
        const { size, sizeUnit } = ItemConfig.resolveSize(itemConfig.size, itemConfig.width, itemConfig.height, rowAndColumnChildLegacySizeDefault);
        const { size: minSize, sizeUnit: minSizeUnit } = ItemConfig.resolveMinSize(itemConfig.minSize, itemConfig.minWidth, itemConfig.minHeight);
        const result = {
            type: types_1.ItemType.stack,
            content: resolveContent(itemConfig.content),
            size,
            sizeUnit,
            minSize,
            minSizeUnit,
            id,
            maximised,
            isClosable: (_a = itemConfig.isClosable) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedItemConfig.defaults.isClosable,
            activeItemIndex: (_b = itemConfig.activeItemIndex) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedStackItemConfig.defaultActiveItemIndex,
            header: HeaderedItemConfig.Header.resolve(itemConfig.header, itemConfig.hasHeaders),
        };
        return result;
    }
    StackItemConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            type: types_1.ItemType.stack,
            content: fromResolvedContent(resolvedConfig.content),
            size: formatSize(resolvedConfig.size, resolvedConfig.sizeUnit),
            minSize: formatUndefinableSize(resolvedConfig.minSize, resolvedConfig.minSizeUnit),
            id: resolvedConfig.id,
            maximised: resolvedConfig.maximised,
            isClosable: resolvedConfig.isClosable,
            activeItemIndex: resolvedConfig.activeItemIndex,
            header: resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(resolvedConfig.header),
        };
        return result;
    }
    StackItemConfig.fromResolved = fromResolved;
    /** @internal */
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                const childItemConfig = content[i];
                const itemConfig = ItemConfig.resolve(childItemConfig, false);
                if (!resolved_config_1.ResolvedItemConfig.isComponentItem(itemConfig)) {
                    throw new internal_error_1.AssertError('UCUSICRC91114', JSON.stringify(itemConfig));
                }
                else {
                    result[i] = itemConfig;
                }
            }
            return result;
        }
    }
    /** @internal */
    function fromResolvedContent(resolvedContent) {
        const count = resolvedContent.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const resolvedContentConfig = resolvedContent[i];
            result[i] = ComponentItemConfig.fromResolved(resolvedContentConfig);
        }
        return result;
    }
})(StackItemConfig = exports.StackItemConfig || (exports.StackItemConfig = {}));
/** @public */
var ComponentItemConfig;
(function (ComponentItemConfig) {
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        var _a, _b, _c;
        let componentType = itemConfig.componentType;
        if (componentType === undefined) {
            componentType = itemConfig.componentName;
        }
        if (componentType === undefined) {
            throw new Error('ComponentItemConfig.componentType is undefined');
        }
        else {
            const { id, maximised } = HeaderedItemConfig.resolveIdAndMaximised(itemConfig);
            let title;
            if (itemConfig.title === undefined || itemConfig.title === '') {
                title = ComponentItemConfig.componentTypeToTitle(componentType);
            }
            else {
                title = itemConfig.title;
            }
            const { size, sizeUnit } = ItemConfig.resolveSize(itemConfig.size, itemConfig.width, itemConfig.height, rowAndColumnChildLegacySizeDefault);
            const { size: minSize, sizeUnit: minSizeUnit } = ItemConfig.resolveMinSize(itemConfig.minSize, itemConfig.minWidth, itemConfig.minHeight);
            const result = {
                type: itemConfig.type,
                content: [],
                size,
                sizeUnit,
                minSize,
                minSizeUnit,
                id,
                maximised,
                isClosable: (_a = itemConfig.isClosable) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedItemConfig.defaults.isClosable,
                reorderEnabled: (_b = itemConfig.reorderEnabled) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedComponentItemConfig.defaultReorderEnabled,
                title,
                header: HeaderedItemConfig.Header.resolve(itemConfig.header, itemConfig.hasHeaders),
                componentType,
                componentState: (_c = itemConfig.componentState) !== null && _c !== void 0 ? _c : {},
            };
            return result;
        }
    }
    ComponentItemConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            type: types_1.ItemType.component,
            size: formatSize(resolvedConfig.size, resolvedConfig.sizeUnit),
            minSize: formatUndefinableSize(resolvedConfig.minSize, resolvedConfig.minSizeUnit),
            id: resolvedConfig.id,
            maximised: resolvedConfig.maximised,
            isClosable: resolvedConfig.isClosable,
            reorderEnabled: resolvedConfig.reorderEnabled,
            title: resolvedConfig.title,
            header: resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(resolvedConfig.header),
            componentType: resolvedConfig.componentType,
            componentState: (0, utils_1.deepExtendValue)(undefined, resolvedConfig.componentState),
        };
        return result;
    }
    ComponentItemConfig.fromResolved = fromResolved;
    function componentTypeToTitle(componentType) {
        const componentTypeType = typeof componentType;
        switch (componentTypeType) {
            case 'string': return componentType;
            case 'number': return componentType.toString();
            case 'boolean': return componentType.toString();
            default: return '';
        }
    }
    ComponentItemConfig.componentTypeToTitle = componentTypeToTitle;
})(ComponentItemConfig = exports.ComponentItemConfig || (exports.ComponentItemConfig = {}));
/** @public */
var RowOrColumnItemConfig;
(function (RowOrColumnItemConfig) {
    function isChildItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
            case types_1.ItemType.stack:
            case types_1.ItemType.component:
                return true;
            case types_1.ItemType.ground:
                return false;
            default:
                throw new internal_error_1.UnreachableCaseError('UROCOSPCICIC13687', itemConfig.type);
        }
    }
    RowOrColumnItemConfig.isChildItemConfig = isChildItemConfig;
    /** @internal */
    function resolve(itemConfig, rowAndColumnChildLegacySizeDefault) {
        var _a;
        const { size, sizeUnit } = ItemConfig.resolveSize(itemConfig.size, itemConfig.width, itemConfig.height, rowAndColumnChildLegacySizeDefault);
        const { size: minSize, sizeUnit: minSizeUnit } = ItemConfig.resolveMinSize(itemConfig.minSize, itemConfig.minWidth, itemConfig.minHeight);
        const result = {
            type: itemConfig.type,
            content: RowOrColumnItemConfig.resolveContent(itemConfig.content),
            size,
            sizeUnit,
            minSize,
            minSizeUnit,
            id: ItemConfig.resolveId(itemConfig.id),
            isClosable: (_a = itemConfig.isClosable) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedItemConfig.defaults.isClosable,
        };
        return result;
    }
    RowOrColumnItemConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            type: resolvedConfig.type,
            content: fromResolvedContent(resolvedConfig.content),
            size: formatSize(resolvedConfig.size, resolvedConfig.sizeUnit),
            minSize: formatUndefinableSize(resolvedConfig.minSize, resolvedConfig.minSizeUnit),
            id: resolvedConfig.id,
            isClosable: resolvedConfig.isClosable,
        };
        return result;
    }
    RowOrColumnItemConfig.fromResolved = fromResolved;
    /** @internal */
    function resolveContent(content) {
        if (content === undefined) {
            return [];
        }
        else {
            const count = content.length;
            const childItemConfigs = new Array(count);
            let widthOrHeightSpecifiedAtLeastOnce = false;
            let sizeSpecifiedAtLeastOnce = false;
            for (let i = 0; i < count; i++) {
                const childItemConfig = content[i];
                if (!RowOrColumnItemConfig.isChildItemConfig(childItemConfig)) {
                    throw new external_error_1.ConfigurationError('ItemConfig is not Row, Column or Stack', childItemConfig);
                }
                else {
                    if (!sizeSpecifiedAtLeastOnce) {
                        const sizeWidthHeightSpecificationType = ItemConfig.calculateSizeWidthHeightSpecificationType(childItemConfig);
                        switch (sizeWidthHeightSpecificationType) {
                            case 0 /* None */:
                                break;
                            case 2 /* WidthOrHeight */:
                                widthOrHeightSpecifiedAtLeastOnce = true;
                                break;
                            case 1 /* Size */:
                                sizeSpecifiedAtLeastOnce = true;
                                break;
                            default:
                                throw new internal_error_1.UnreachableCaseError('ROCICRC87556', sizeWidthHeightSpecificationType);
                        }
                    }
                    childItemConfigs[i] = childItemConfig;
                }
            }
            let legacySizeDefault;
            if (sizeSpecifiedAtLeastOnce) {
                legacySizeDefault = false;
            }
            else {
                if (widthOrHeightSpecifiedAtLeastOnce) {
                    legacySizeDefault = true;
                }
                else {
                    legacySizeDefault = false;
                }
            }
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                const childItemConfig = childItemConfigs[i];
                const resolvedChildItemConfig = ItemConfig.resolve(childItemConfig, legacySizeDefault);
                if (!resolved_config_1.ResolvedRowOrColumnItemConfig.isChildItemConfig(resolvedChildItemConfig)) {
                    throw new internal_error_1.AssertError('UROCOSPIC99512', JSON.stringify(resolvedChildItemConfig));
                }
                else {
                    result[i] = resolvedChildItemConfig;
                }
            }
            return result;
        }
    }
    RowOrColumnItemConfig.resolveContent = resolveContent;
    /** @internal */
    function fromResolvedContent(resolvedContent) {
        const count = resolvedContent.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const resolvedContentConfig = resolvedContent[i];
            const type = resolvedContentConfig.type;
            let contentConfig;
            switch (type) {
                case types_1.ItemType.row:
                case types_1.ItemType.column:
                    contentConfig = RowOrColumnItemConfig.fromResolved(resolvedContentConfig);
                    break;
                case types_1.ItemType.stack:
                    contentConfig = StackItemConfig.fromResolved(resolvedContentConfig);
                    break;
                case types_1.ItemType.component:
                    contentConfig = ComponentItemConfig.fromResolved(resolvedContentConfig);
                    break;
                default:
                    throw new internal_error_1.UnreachableCaseError('ROCICFRC44797', type);
            }
            result[i] = contentConfig;
        }
        return result;
    }
})(RowOrColumnItemConfig = exports.RowOrColumnItemConfig || (exports.RowOrColumnItemConfig = {}));
/** @public */
var RootItemConfig;
(function (RootItemConfig) {
    function isRootItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
            case types_1.ItemType.stack:
            case types_1.ItemType.component:
                return true;
            case types_1.ItemType.ground:
                return false;
            default:
                throw new internal_error_1.UnreachableCaseError('URICIR23687', itemConfig.type);
        }
    }
    RootItemConfig.isRootItemConfig = isRootItemConfig;
    /** @internal */
    function resolve(itemConfig) {
        if (itemConfig === undefined) {
            return undefined;
        }
        else {
            const result = ItemConfig.resolve(itemConfig, false);
            if (!resolved_config_1.ResolvedRootItemConfig.isRootItemConfig(result)) {
                throw new external_error_1.ConfigurationError('ItemConfig is not Row, Column or Stack', JSON.stringify(itemConfig));
            }
            else {
                return result;
            }
        }
    }
    RootItemConfig.resolve = resolve;
    /** @internal */
    function fromResolvedOrUndefined(resolvedItemConfig) {
        if (resolvedItemConfig === undefined) {
            return undefined;
        }
        else {
            const type = resolvedItemConfig.type;
            switch (type) {
                case types_1.ItemType.row:
                case types_1.ItemType.column:
                    return RowOrColumnItemConfig.fromResolved(resolvedItemConfig);
                case types_1.ItemType.stack:
                    return StackItemConfig.fromResolved(resolvedItemConfig);
                case types_1.ItemType.component:
                    return ComponentItemConfig.fromResolved(resolvedItemConfig);
                default:
                    throw new internal_error_1.UnreachableCaseError('RICFROU89921', type);
            }
        }
    }
    RootItemConfig.fromResolvedOrUndefined = fromResolvedOrUndefined;
})(RootItemConfig = exports.RootItemConfig || (exports.RootItemConfig = {}));
/** Use to specify LayoutConfig with defaults or deserialise a LayoutConfig.
 * Deserialisation will handle backwards compatibility.
 * Note that LayoutConfig should be used for serialisation (not LayoutConfig)
 * @public
 */
var LayoutConfig;
(function (LayoutConfig) {
    let Settings;
    (function (Settings) {
        function resolve(settings) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const result = {
                constrainDragToContainer: (_a = settings === null || settings === void 0 ? void 0 : settings.constrainDragToContainer) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.constrainDragToContainer,
                reorderEnabled: (_b = settings === null || settings === void 0 ? void 0 : settings.reorderEnabled) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.reorderEnabled,
                popoutWholeStack: (_c = settings === null || settings === void 0 ? void 0 : settings.popoutWholeStack) !== null && _c !== void 0 ? _c : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.popoutWholeStack,
                blockedPopoutsThrowError: (_d = settings === null || settings === void 0 ? void 0 : settings.blockedPopoutsThrowError) !== null && _d !== void 0 ? _d : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.blockedPopoutsThrowError,
                closePopoutsOnUnload: (_e = settings === null || settings === void 0 ? void 0 : settings.closePopoutsOnUnload) !== null && _e !== void 0 ? _e : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.closePopoutsOnUnload,
                responsiveMode: (_f = settings === null || settings === void 0 ? void 0 : settings.responsiveMode) !== null && _f !== void 0 ? _f : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.responsiveMode,
                tabOverlapAllowance: (_g = settings === null || settings === void 0 ? void 0 : settings.tabOverlapAllowance) !== null && _g !== void 0 ? _g : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.tabOverlapAllowance,
                reorderOnTabMenuClick: (_h = settings === null || settings === void 0 ? void 0 : settings.reorderOnTabMenuClick) !== null && _h !== void 0 ? _h : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.reorderOnTabMenuClick,
                tabControlOffset: (_j = settings === null || settings === void 0 ? void 0 : settings.tabControlOffset) !== null && _j !== void 0 ? _j : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.tabControlOffset,
                popInOnClose: (_k = settings === null || settings === void 0 ? void 0 : settings.popInOnClose) !== null && _k !== void 0 ? _k : resolved_config_1.ResolvedLayoutConfig.Settings.defaults.popInOnClose,
            };
            return result;
        }
        Settings.resolve = resolve;
    })(Settings = LayoutConfig.Settings || (LayoutConfig.Settings = {}));
    let Dimensions;
    (function (Dimensions) {
        /** @internal */
        function resolve(dimensions) {
            var _a, _b, _c, _d, _e;
            const { size: defaultMinItemHeight, sizeUnit: defaultMinItemHeightUnit } = Dimensions.resolveDefaultMinItemHeight(dimensions);
            const { size: defaultMinItemWidth, sizeUnit: defaultMinItemWidthUnit } = Dimensions.resolveDefaultMinItemWidth(dimensions);
            const result = {
                borderWidth: (_a = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderWidth) !== null && _a !== void 0 ? _a : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.borderWidth,
                borderGrabWidth: (_b = dimensions === null || dimensions === void 0 ? void 0 : dimensions.borderGrabWidth) !== null && _b !== void 0 ? _b : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.borderGrabWidth,
                defaultMinItemHeight,
                defaultMinItemHeightUnit,
                defaultMinItemWidth,
                defaultMinItemWidthUnit,
                headerHeight: (_c = dimensions === null || dimensions === void 0 ? void 0 : dimensions.headerHeight) !== null && _c !== void 0 ? _c : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.headerHeight,
                dragProxyWidth: (_d = dimensions === null || dimensions === void 0 ? void 0 : dimensions.dragProxyWidth) !== null && _d !== void 0 ? _d : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.dragProxyWidth,
                dragProxyHeight: (_e = dimensions === null || dimensions === void 0 ? void 0 : dimensions.dragProxyHeight) !== null && _e !== void 0 ? _e : resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.dragProxyHeight,
            };
            return result;
        }
        Dimensions.resolve = resolve;
        /** @internal */
        function fromResolved(resolvedDimensions) {
            const result = {
                borderWidth: resolvedDimensions.borderWidth,
                borderGrabWidth: resolvedDimensions.borderGrabWidth,
                defaultMinItemHeight: formatSize(resolvedDimensions.defaultMinItemHeight, resolvedDimensions.defaultMinItemHeightUnit),
                defaultMinItemWidth: formatSize(resolvedDimensions.defaultMinItemWidth, resolvedDimensions.defaultMinItemWidthUnit),
                headerHeight: resolvedDimensions.headerHeight,
                dragProxyWidth: resolvedDimensions.dragProxyWidth,
                dragProxyHeight: resolvedDimensions.dragProxyHeight,
            };
            return result;
        }
        Dimensions.fromResolved = fromResolved;
        /** @internal */
        function resolveDefaultMinItemHeight(dimensions) {
            const height = dimensions === null || dimensions === void 0 ? void 0 : dimensions.defaultMinItemHeight;
            if (height === undefined) {
                return { size: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemHeight, sizeUnit: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemHeightUnit };
            }
            else {
                return parseSize(height, [types_1.SizeUnitEnum.Pixel]);
            }
        }
        Dimensions.resolveDefaultMinItemHeight = resolveDefaultMinItemHeight;
        /** @internal */
        function resolveDefaultMinItemWidth(dimensions) {
            const width = dimensions === null || dimensions === void 0 ? void 0 : dimensions.defaultMinItemWidth;
            if (width === undefined) {
                return { size: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemWidth, sizeUnit: resolved_config_1.ResolvedLayoutConfig.Dimensions.defaults.defaultMinItemWidthUnit };
            }
            else {
                return parseSize(width, [types_1.SizeUnitEnum.Pixel]);
            }
        }
        Dimensions.resolveDefaultMinItemWidth = resolveDefaultMinItemWidth;
    })(Dimensions = LayoutConfig.Dimensions || (LayoutConfig.Dimensions = {}));
    let Header;
    (function (Header) {
        /** @internal */
        function resolve(header, settings, labels) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            let show;
            if ((header === null || header === void 0 ? void 0 : header.show) !== undefined) {
                show = header.show;
            }
            else {
                if (settings !== undefined && settings.hasHeaders !== undefined) {
                    show = settings.hasHeaders ? resolved_config_1.ResolvedLayoutConfig.Header.defaults.show : false;
                }
                else {
                    show = resolved_config_1.ResolvedLayoutConfig.Header.defaults.show;
                }
            }
            const result = {
                show,
                popout: (_b = (_a = header === null || header === void 0 ? void 0 : header.popout) !== null && _a !== void 0 ? _a : labels === null || labels === void 0 ? void 0 : labels.popout) !== null && _b !== void 0 ? _b : ((settings === null || settings === void 0 ? void 0 : settings.showPopoutIcon) === false ? false : resolved_config_1.ResolvedLayoutConfig.Header.defaults.popout),
                dock: (_d = (_c = header === null || header === void 0 ? void 0 : header.popin) !== null && _c !== void 0 ? _c : labels === null || labels === void 0 ? void 0 : labels.popin) !== null && _d !== void 0 ? _d : resolved_config_1.ResolvedLayoutConfig.Header.defaults.dock,
                maximise: (_f = (_e = header === null || header === void 0 ? void 0 : header.maximise) !== null && _e !== void 0 ? _e : labels === null || labels === void 0 ? void 0 : labels.maximise) !== null && _f !== void 0 ? _f : ((settings === null || settings === void 0 ? void 0 : settings.showMaximiseIcon) === false ? false : resolved_config_1.ResolvedLayoutConfig.Header.defaults.maximise),
                close: (_h = (_g = header === null || header === void 0 ? void 0 : header.close) !== null && _g !== void 0 ? _g : labels === null || labels === void 0 ? void 0 : labels.close) !== null && _h !== void 0 ? _h : ((settings === null || settings === void 0 ? void 0 : settings.showCloseIcon) === false ? false : resolved_config_1.ResolvedLayoutConfig.Header.defaults.close),
                minimise: (_k = (_j = header === null || header === void 0 ? void 0 : header.minimise) !== null && _j !== void 0 ? _j : labels === null || labels === void 0 ? void 0 : labels.minimise) !== null && _k !== void 0 ? _k : resolved_config_1.ResolvedLayoutConfig.Header.defaults.minimise,
                tabDropdown: (_m = (_l = header === null || header === void 0 ? void 0 : header.tabDropdown) !== null && _l !== void 0 ? _l : labels === null || labels === void 0 ? void 0 : labels.tabDropdown) !== null && _m !== void 0 ? _m : resolved_config_1.ResolvedLayoutConfig.Header.defaults.tabDropdown,
            };
            return result;
        }
        Header.resolve = resolve;
    })(Header = LayoutConfig.Header || (LayoutConfig.Header = {}));
    function isPopout(config) {
        return 'parentId' in config || 'indexInParent' in config || 'window' in config;
    }
    LayoutConfig.isPopout = isPopout;
    /** @internal */
    function resolve(layoutConfig) {
        if (isPopout(layoutConfig)) {
            return PopoutLayoutConfig.resolve(layoutConfig);
        }
        else {
            let root;
            if (layoutConfig.root !== undefined) {
                root = layoutConfig.root;
            }
            else {
                if (layoutConfig.content !== undefined && layoutConfig.content.length > 0) {
                    root = layoutConfig.content[0];
                }
                else {
                    root = undefined;
                }
            }
            const config = {
                resolved: true,
                root: RootItemConfig.resolve(root),
                openPopouts: LayoutConfig.resolveOpenPopouts(layoutConfig.openPopouts),
                dimensions: LayoutConfig.Dimensions.resolve(layoutConfig.dimensions),
                settings: LayoutConfig.Settings.resolve(layoutConfig.settings),
                header: LayoutConfig.Header.resolve(layoutConfig.header, layoutConfig.settings, layoutConfig.labels),
            };
            return config;
        }
    }
    LayoutConfig.resolve = resolve;
    function fromResolved(config) {
        const result = {
            root: RootItemConfig.fromResolvedOrUndefined(config.root),
            openPopouts: PopoutLayoutConfig.fromResolvedArray(config.openPopouts),
            settings: resolved_config_1.ResolvedLayoutConfig.Settings.createCopy(config.settings),
            dimensions: LayoutConfig.Dimensions.fromResolved(config.dimensions),
            header: resolved_config_1.ResolvedLayoutConfig.Header.createCopy(config.header),
        };
        return result;
    }
    LayoutConfig.fromResolved = fromResolved;
    function isResolved(configOrResolvedConfig) {
        const config = configOrResolvedConfig;
        return config.resolved !== undefined && (config.resolved === true);
    }
    LayoutConfig.isResolved = isResolved;
    /** @internal */
    function resolveOpenPopouts(popoutConfigs) {
        if (popoutConfigs === undefined) {
            return [];
        }
        else {
            const count = popoutConfigs.length;
            const result = new Array(count);
            for (let i = 0; i < count; i++) {
                result[i] = PopoutLayoutConfig.resolve(popoutConfigs[i]);
            }
            return result;
        }
    }
    LayoutConfig.resolveOpenPopouts = resolveOpenPopouts;
})(LayoutConfig = exports.LayoutConfig || (exports.LayoutConfig = {}));
/** @public */
var PopoutLayoutConfig;
(function (PopoutLayoutConfig) {
    let Window;
    (function (Window) {
        /** @internal */
        function resolve(window, dimensions) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let result;
            const defaults = resolved_config_1.ResolvedPopoutLayoutConfig.Window.defaults;
            if (window !== undefined) {
                result = {
                    width: (_a = window.width) !== null && _a !== void 0 ? _a : defaults.width,
                    height: (_b = window.height) !== null && _b !== void 0 ? _b : defaults.height,
                    left: (_c = window.left) !== null && _c !== void 0 ? _c : defaults.left,
                    top: (_d = window.top) !== null && _d !== void 0 ? _d : defaults.top,
                };
            }
            else {
                result = {
                    width: (_e = dimensions === null || dimensions === void 0 ? void 0 : dimensions.width) !== null && _e !== void 0 ? _e : defaults.width,
                    height: (_f = dimensions === null || dimensions === void 0 ? void 0 : dimensions.height) !== null && _f !== void 0 ? _f : defaults.height,
                    left: (_g = dimensions === null || dimensions === void 0 ? void 0 : dimensions.left) !== null && _g !== void 0 ? _g : defaults.left,
                    top: (_h = dimensions === null || dimensions === void 0 ? void 0 : dimensions.top) !== null && _h !== void 0 ? _h : defaults.top,
                };
            }
            return result;
        }
        Window.resolve = resolve;
        /** @internal */
        function fromResolved(resolvedWindow) {
            const result = {
                width: resolvedWindow.width === null ? undefined : resolvedWindow.width,
                height: resolvedWindow.height === null ? undefined : resolvedWindow.height,
                left: resolvedWindow.left === null ? undefined : resolvedWindow.left,
                top: resolvedWindow.top === null ? undefined : resolvedWindow.top,
            };
            return result;
        }
        Window.fromResolved = fromResolved;
    })(Window = PopoutLayoutConfig.Window || (PopoutLayoutConfig.Window = {}));
    /** @internal */
    function resolve(popoutConfig) {
        var _a, _b;
        let root;
        if (popoutConfig.root !== undefined) {
            root = popoutConfig.root;
        }
        else {
            if (popoutConfig.content !== undefined && popoutConfig.content.length > 0) {
                root = popoutConfig.content[0];
            }
            else {
                root = undefined;
            }
        }
        const config = {
            root: RootItemConfig.resolve(root),
            openPopouts: LayoutConfig.resolveOpenPopouts(popoutConfig.openPopouts),
            dimensions: LayoutConfig.Dimensions.resolve(popoutConfig.dimensions),
            settings: LayoutConfig.Settings.resolve(popoutConfig.settings),
            header: LayoutConfig.Header.resolve(popoutConfig.header, popoutConfig.settings, popoutConfig.labels),
            parentId: (_a = popoutConfig.parentId) !== null && _a !== void 0 ? _a : null,
            indexInParent: (_b = popoutConfig.indexInParent) !== null && _b !== void 0 ? _b : null,
            window: PopoutLayoutConfig.Window.resolve(popoutConfig.window, popoutConfig.dimensions),
            resolved: true,
        };
        return config;
    }
    PopoutLayoutConfig.resolve = resolve;
    /** @internal */
    function fromResolved(resolvedConfig) {
        const result = {
            root: RootItemConfig.fromResolvedOrUndefined(resolvedConfig.root),
            openPopouts: fromResolvedArray(resolvedConfig.openPopouts),
            dimensions: LayoutConfig.Dimensions.fromResolved(resolvedConfig.dimensions),
            settings: resolved_config_1.ResolvedLayoutConfig.Settings.createCopy(resolvedConfig.settings),
            header: resolved_config_1.ResolvedLayoutConfig.Header.createCopy(resolvedConfig.header),
            parentId: resolvedConfig.parentId,
            indexInParent: resolvedConfig.indexInParent,
            window: PopoutLayoutConfig.Window.fromResolved(resolvedConfig.window),
        };
        return result;
    }
    PopoutLayoutConfig.fromResolved = fromResolved;
    /** @internal */
    function fromResolvedArray(resolvedArray) {
        const resolvedOpenPopoutCount = resolvedArray.length;
        const result = new Array(resolvedOpenPopoutCount);
        for (let i = 0; i < resolvedOpenPopoutCount; i++) {
            const resolvedOpenPopout = resolvedArray[i];
            result[i] = PopoutLayoutConfig.fromResolved(resolvedOpenPopout);
        }
        return result;
    }
    PopoutLayoutConfig.fromResolvedArray = fromResolvedArray;
})(PopoutLayoutConfig = exports.PopoutLayoutConfig || (exports.PopoutLayoutConfig = {}));
/** @internal */
function parseSize(sizeString, allowableSizeUnits) {
    const { numericPart: digitsPart, firstNonNumericCharPart: firstNonDigitPart } = (0, utils_1.splitStringAtFirstNonNumericChar)(sizeString);
    const size = Number.parseInt(digitsPart, 10);
    if (isNaN(size)) {
        throw new external_error_1.ConfigurationError(`${i18n_strings_1.i18nStrings[7 /* InvalidNumberPartInSizeString */]}: ${sizeString}`);
    }
    else {
        const sizeUnit = types_1.SizeUnitEnum.tryParse(firstNonDigitPart);
        if (sizeUnit === undefined) {
            throw new external_error_1.ConfigurationError(`${i18n_strings_1.i18nStrings[8 /* UnknownUnitInSizeString */]}: ${sizeString}`);
        }
        else {
            if (!allowableSizeUnits.includes(sizeUnit)) {
                throw new external_error_1.ConfigurationError(`${i18n_strings_1.i18nStrings[9 /* UnsupportedUnitInSizeString */]}: ${sizeString}`);
            }
            else {
                return { size, sizeUnit };
            }
        }
    }
}
exports.parseSize = parseSize;
/** @internal */
function formatSize(size, sizeUnit) {
    return size.toString(10) + types_1.SizeUnitEnum.format(sizeUnit);
}
exports.formatSize = formatSize;
/** @internal */
function formatUndefinableSize(size, sizeUnit) {
    if (size === undefined) {
        return undefined;
    }
    else {
        return size.toString(10) + types_1.SizeUnitEnum.format(sizeUnit);
    }
}
exports.formatUndefinableSize = formatUndefinableSize;

},{"../errors/external-error":16,"../errors/internal-error":17,"../utils/i18n-strings":30,"../utils/types":32,"../utils/utils":33,"./resolved-config":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvedPopoutLayoutConfig = exports.ResolvedLayoutConfig = exports.ResolvedGroundItemConfig = exports.ResolvedRootItemConfig = exports.ResolvedRowOrColumnItemConfig = exports.ResolvedComponentItemConfig = exports.ResolvedStackItemConfig = exports.ResolvedHeaderedItemConfig = exports.ResolvedItemConfig = void 0;
const internal_error_1 = require("../errors/internal-error");
const config_minifier_1 = require("../utils/config-minifier");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
/** @public */
var ResolvedItemConfig;
(function (ResolvedItemConfig) {
    ResolvedItemConfig.defaults = {
        type: types_1.ItemType.ground,
        content: [],
        size: 1,
        sizeUnit: types_1.SizeUnitEnum.Fractional,
        minSize: undefined,
        minSizeUnit: types_1.SizeUnitEnum.Pixel,
        id: '',
        isClosable: true,
    };
    /** Creates a copy of the original ResolvedItemConfig using an alternative content if specified */
    function createCopy(original, content) {
        switch (original.type) {
            case types_1.ItemType.ground:
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                return ResolvedRowOrColumnItemConfig.createCopy(original, content);
            case types_1.ItemType.stack:
                return ResolvedStackItemConfig.createCopy(original, content);
            case types_1.ItemType.component:
                return ResolvedComponentItemConfig.createCopy(original);
            default:
                throw new internal_error_1.UnreachableCaseError('CICC91354', original.type, 'Invalid Config Item type specified');
        }
    }
    ResolvedItemConfig.createCopy = createCopy;
    function createDefault(type) {
        switch (type) {
            case types_1.ItemType.ground:
                throw new internal_error_1.AssertError('CICCDR91562'); // Get default root from LayoutConfig
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                return ResolvedRowOrColumnItemConfig.createDefault(type);
            case types_1.ItemType.stack:
                return ResolvedStackItemConfig.createDefault();
            case types_1.ItemType.component:
                return ResolvedComponentItemConfig.createDefault();
            default:
                throw new internal_error_1.UnreachableCaseError('CICCDD91563', type, 'Invalid Config Item type specified');
        }
    }
    ResolvedItemConfig.createDefault = createDefault;
    function isComponentItem(itemConfig) {
        return itemConfig.type === types_1.ItemType.component;
    }
    ResolvedItemConfig.isComponentItem = isComponentItem;
    function isStackItem(itemConfig) {
        return itemConfig.type === types_1.ItemType.stack;
    }
    ResolvedItemConfig.isStackItem = isStackItem;
    /** @internal */
    function isGroundItem(itemConfig) {
        return itemConfig.type === types_1.ItemType.ground;
    }
    ResolvedItemConfig.isGroundItem = isGroundItem;
})(ResolvedItemConfig = exports.ResolvedItemConfig || (exports.ResolvedItemConfig = {}));
/** @public */
var ResolvedHeaderedItemConfig;
(function (ResolvedHeaderedItemConfig) {
    ResolvedHeaderedItemConfig.defaultMaximised = false;
    let Header;
    (function (Header) {
        function createCopy(original, show) {
            if (original === undefined) {
                return undefined;
            }
            else {
                return {
                    show: show !== null && show !== void 0 ? show : original.show,
                    popout: original.popout,
                    close: original.close,
                    maximise: original.maximise,
                    minimise: original.minimise,
                    tabDropdown: original.tabDropdown,
                };
            }
        }
        Header.createCopy = createCopy;
    })(Header = ResolvedHeaderedItemConfig.Header || (ResolvedHeaderedItemConfig.Header = {}));
})(ResolvedHeaderedItemConfig = exports.ResolvedHeaderedItemConfig || (exports.ResolvedHeaderedItemConfig = {}));
/** @public */
var ResolvedStackItemConfig;
(function (ResolvedStackItemConfig) {
    ResolvedStackItemConfig.defaultActiveItemIndex = 0;
    function createCopy(original, content) {
        const result = {
            type: original.type,
            content: content !== undefined ? copyContent(content) : copyContent(original.content),
            size: original.size,
            sizeUnit: original.sizeUnit,
            minSize: original.minSize,
            minSizeUnit: original.minSizeUnit,
            id: original.id,
            maximised: original.maximised,
            isClosable: original.isClosable,
            activeItemIndex: original.activeItemIndex,
            header: ResolvedHeaderedItemConfig.Header.createCopy(original.header),
        };
        return result;
    }
    ResolvedStackItemConfig.createCopy = createCopy;
    function copyContent(original) {
        const count = original.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = ResolvedItemConfig.createCopy(original[i]);
        }
        return result;
    }
    ResolvedStackItemConfig.copyContent = copyContent;
    function createDefault() {
        const result = {
            type: types_1.ItemType.stack,
            content: [],
            size: ResolvedItemConfig.defaults.size,
            sizeUnit: ResolvedItemConfig.defaults.sizeUnit,
            minSize: ResolvedItemConfig.defaults.minSize,
            minSizeUnit: ResolvedItemConfig.defaults.minSizeUnit,
            id: ResolvedItemConfig.defaults.id,
            maximised: ResolvedHeaderedItemConfig.defaultMaximised,
            isClosable: ResolvedItemConfig.defaults.isClosable,
            activeItemIndex: ResolvedStackItemConfig.defaultActiveItemIndex,
            header: undefined,
        };
        return result;
    }
    ResolvedStackItemConfig.createDefault = createDefault;
})(ResolvedStackItemConfig = exports.ResolvedStackItemConfig || (exports.ResolvedStackItemConfig = {}));
/** @public */
var ResolvedComponentItemConfig;
(function (ResolvedComponentItemConfig) {
    ResolvedComponentItemConfig.defaultReorderEnabled = true;
    function resolveComponentTypeName(itemConfig) {
        const componentType = itemConfig.componentType;
        if (typeof componentType === 'string') {
            return componentType;
        }
        else {
            return undefined;
        }
    }
    ResolvedComponentItemConfig.resolveComponentTypeName = resolveComponentTypeName;
    function createCopy(original) {
        const result = {
            type: original.type,
            content: [],
            size: original.size,
            sizeUnit: original.sizeUnit,
            minSize: original.minSize,
            minSizeUnit: original.minSizeUnit,
            id: original.id,
            maximised: original.maximised,
            isClosable: original.isClosable,
            reorderEnabled: original.reorderEnabled,
            title: original.title,
            header: ResolvedHeaderedItemConfig.Header.createCopy(original.header),
            componentType: original.componentType,
            componentState: (0, utils_1.deepExtendValue)(undefined, original.componentState),
        };
        return result;
    }
    ResolvedComponentItemConfig.createCopy = createCopy;
    function createDefault(componentType = '', componentState, title = '') {
        const result = {
            type: types_1.ItemType.component,
            content: [],
            size: ResolvedItemConfig.defaults.size,
            sizeUnit: ResolvedItemConfig.defaults.sizeUnit,
            minSize: ResolvedItemConfig.defaults.minSize,
            minSizeUnit: ResolvedItemConfig.defaults.minSizeUnit,
            id: ResolvedItemConfig.defaults.id,
            maximised: ResolvedHeaderedItemConfig.defaultMaximised,
            isClosable: ResolvedItemConfig.defaults.isClosable,
            reorderEnabled: ResolvedComponentItemConfig.defaultReorderEnabled,
            title,
            header: undefined,
            componentType,
            componentState,
        };
        return result;
    }
    ResolvedComponentItemConfig.createDefault = createDefault;
    function copyComponentType(componentType) {
        return (0, utils_1.deepExtendValue)({}, componentType);
    }
    ResolvedComponentItemConfig.copyComponentType = copyComponentType;
})(ResolvedComponentItemConfig = exports.ResolvedComponentItemConfig || (exports.ResolvedComponentItemConfig = {}));
/** @public */
var ResolvedRowOrColumnItemConfig;
(function (ResolvedRowOrColumnItemConfig) {
    function isChildItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
            case types_1.ItemType.stack:
            case types_1.ItemType.component:
                return true;
            case types_1.ItemType.ground:
                return false;
            default:
                throw new internal_error_1.UnreachableCaseError('CROCOSPCICIC13687', itemConfig.type);
        }
    }
    ResolvedRowOrColumnItemConfig.isChildItemConfig = isChildItemConfig;
    function createCopy(original, content) {
        const result = {
            type: original.type,
            content: content !== undefined ? copyContent(content) : copyContent(original.content),
            size: original.size,
            sizeUnit: original.sizeUnit,
            minSize: original.minSize,
            minSizeUnit: original.minSizeUnit,
            id: original.id,
            isClosable: original.isClosable,
        };
        return result;
    }
    ResolvedRowOrColumnItemConfig.createCopy = createCopy;
    function copyContent(original) {
        const count = original.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = ResolvedItemConfig.createCopy(original[i]);
        }
        return result;
    }
    ResolvedRowOrColumnItemConfig.copyContent = copyContent;
    function createDefault(type) {
        const result = {
            type,
            content: [],
            size: ResolvedItemConfig.defaults.size,
            sizeUnit: ResolvedItemConfig.defaults.sizeUnit,
            minSize: ResolvedItemConfig.defaults.minSize,
            minSizeUnit: ResolvedItemConfig.defaults.minSizeUnit,
            id: ResolvedItemConfig.defaults.id,
            isClosable: ResolvedItemConfig.defaults.isClosable,
        };
        return result;
    }
    ResolvedRowOrColumnItemConfig.createDefault = createDefault;
})(ResolvedRowOrColumnItemConfig = exports.ResolvedRowOrColumnItemConfig || (exports.ResolvedRowOrColumnItemConfig = {}));
/** @public */
var ResolvedRootItemConfig;
(function (ResolvedRootItemConfig) {
    function createCopy(config) {
        return ResolvedItemConfig.createCopy(config);
    }
    ResolvedRootItemConfig.createCopy = createCopy;
    function isRootItemConfig(itemConfig) {
        switch (itemConfig.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
            case types_1.ItemType.stack:
            case types_1.ItemType.component:
                return true;
            case types_1.ItemType.ground:
                return false;
            default:
                throw new internal_error_1.UnreachableCaseError('CROCOSPCICIC13687', itemConfig.type);
        }
    }
    ResolvedRootItemConfig.isRootItemConfig = isRootItemConfig;
})(ResolvedRootItemConfig = exports.ResolvedRootItemConfig || (exports.ResolvedRootItemConfig = {}));
/** @internal */
var ResolvedGroundItemConfig;
(function (ResolvedGroundItemConfig) {
    function create(rootItemConfig) {
        const content = rootItemConfig === undefined ? [] : [rootItemConfig];
        return {
            type: types_1.ItemType.ground,
            content,
            size: 100,
            sizeUnit: types_1.SizeUnitEnum.Percent,
            minSize: 0,
            minSizeUnit: types_1.SizeUnitEnum.Pixel,
            id: '',
            isClosable: false,
            title: '',
            reorderEnabled: false,
        };
    }
    ResolvedGroundItemConfig.create = create;
})(ResolvedGroundItemConfig = exports.ResolvedGroundItemConfig || (exports.ResolvedGroundItemConfig = {}));
/** @public */
var ResolvedLayoutConfig;
(function (ResolvedLayoutConfig) {
    let Settings;
    (function (Settings) {
        Settings.defaults = {
            constrainDragToContainer: true,
            reorderEnabled: true,
            popoutWholeStack: false,
            blockedPopoutsThrowError: true,
            closePopoutsOnUnload: true,
            responsiveMode: types_1.ResponsiveMode.none,
            tabOverlapAllowance: 0,
            reorderOnTabMenuClick: true,
            tabControlOffset: 10,
            popInOnClose: false,
        };
        function createCopy(original) {
            return {
                constrainDragToContainer: original.constrainDragToContainer,
                reorderEnabled: original.reorderEnabled,
                popoutWholeStack: original.popoutWholeStack,
                blockedPopoutsThrowError: original.blockedPopoutsThrowError,
                closePopoutsOnUnload: original.closePopoutsOnUnload,
                responsiveMode: original.responsiveMode,
                tabOverlapAllowance: original.tabOverlapAllowance,
                reorderOnTabMenuClick: original.reorderOnTabMenuClick,
                tabControlOffset: original.tabControlOffset,
                popInOnClose: original.popInOnClose,
            };
        }
        Settings.createCopy = createCopy;
    })(Settings = ResolvedLayoutConfig.Settings || (ResolvedLayoutConfig.Settings = {}));
    let Dimensions;
    (function (Dimensions) {
        function createCopy(original) {
            return {
                borderWidth: original.borderWidth,
                borderGrabWidth: original.borderGrabWidth,
                defaultMinItemHeight: original.defaultMinItemHeight,
                defaultMinItemHeightUnit: original.defaultMinItemHeightUnit,
                defaultMinItemWidth: original.defaultMinItemWidth,
                defaultMinItemWidthUnit: original.defaultMinItemWidthUnit,
                headerHeight: original.headerHeight,
                dragProxyWidth: original.dragProxyWidth,
                dragProxyHeight: original.dragProxyHeight,
            };
        }
        Dimensions.createCopy = createCopy;
        Dimensions.defaults = {
            borderWidth: 5,
            borderGrabWidth: 5,
            defaultMinItemHeight: 0,
            defaultMinItemHeightUnit: types_1.SizeUnitEnum.Pixel,
            defaultMinItemWidth: 10,
            defaultMinItemWidthUnit: types_1.SizeUnitEnum.Pixel,
            headerHeight: 20,
            dragProxyWidth: 300,
            dragProxyHeight: 200
        };
    })(Dimensions = ResolvedLayoutConfig.Dimensions || (ResolvedLayoutConfig.Dimensions = {}));
    let Header;
    (function (Header) {
        function createCopy(original) {
            return {
                show: original.show,
                popout: original.popout,
                dock: original.dock,
                close: original.close,
                maximise: original.maximise,
                minimise: original.minimise,
                tabDropdown: original.tabDropdown,
            };
        }
        Header.createCopy = createCopy;
        Header.defaults = {
            show: types_1.Side.top,
            popout: 'open in new window',
            dock: 'dock',
            maximise: 'maximise',
            minimise: 'minimise',
            close: 'close',
            tabDropdown: 'additional tabs'
        };
    })(Header = ResolvedLayoutConfig.Header || (ResolvedLayoutConfig.Header = {}));
    function isPopout(config) {
        return 'parentId' in config;
    }
    ResolvedLayoutConfig.isPopout = isPopout;
    function createDefault() {
        const result = {
            root: undefined,
            openPopouts: [],
            dimensions: ResolvedLayoutConfig.Dimensions.defaults,
            settings: ResolvedLayoutConfig.Settings.defaults,
            header: ResolvedLayoutConfig.Header.defaults,
            resolved: true,
        };
        return result;
    }
    ResolvedLayoutConfig.createDefault = createDefault;
    function createCopy(config) {
        if (isPopout(config)) {
            return ResolvedPopoutLayoutConfig.createCopy(config);
        }
        else {
            const result = {
                root: config.root === undefined ? undefined : ResolvedRootItemConfig.createCopy(config.root),
                openPopouts: ResolvedLayoutConfig.copyOpenPopouts(config.openPopouts),
                settings: ResolvedLayoutConfig.Settings.createCopy(config.settings),
                dimensions: ResolvedLayoutConfig.Dimensions.createCopy(config.dimensions),
                header: ResolvedLayoutConfig.Header.createCopy(config.header),
                resolved: config.resolved,
            };
            return result;
        }
    }
    ResolvedLayoutConfig.createCopy = createCopy;
    function copyOpenPopouts(original) {
        const count = original.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            result[i] = ResolvedPopoutLayoutConfig.createCopy(original[i]);
        }
        return result;
    }
    ResolvedLayoutConfig.copyOpenPopouts = copyOpenPopouts;
    /**
     * Takes a GoldenLayout configuration object and
     * replaces its keys and values recursively with
     * one letter counterparts
     */
    function minifyConfig(layoutConfig) {
        return config_minifier_1.ConfigMinifier.translateObject(layoutConfig, true);
    }
    ResolvedLayoutConfig.minifyConfig = minifyConfig;
    /**
     * Takes a configuration Object that was previously minified
     * using minifyConfig and returns its original version
     */
    function unminifyConfig(minifiedConfig) {
        return config_minifier_1.ConfigMinifier.translateObject(minifiedConfig, false);
    }
    ResolvedLayoutConfig.unminifyConfig = unminifyConfig;
})(ResolvedLayoutConfig = exports.ResolvedLayoutConfig || (exports.ResolvedLayoutConfig = {}));
/** @public */
var ResolvedPopoutLayoutConfig;
(function (ResolvedPopoutLayoutConfig) {
    let Window;
    (function (Window) {
        function createCopy(original) {
            return {
                width: original.width,
                height: original.height,
                left: original.left,
                top: original.top,
            };
        }
        Window.createCopy = createCopy;
        Window.defaults = {
            width: null,
            height: null,
            left: null,
            top: null,
        };
    })(Window = ResolvedPopoutLayoutConfig.Window || (ResolvedPopoutLayoutConfig.Window = {}));
    function createCopy(original) {
        const result = {
            root: original.root === undefined ? undefined : ResolvedRootItemConfig.createCopy(original.root),
            openPopouts: ResolvedLayoutConfig.copyOpenPopouts(original.openPopouts),
            settings: ResolvedLayoutConfig.Settings.createCopy(original.settings),
            dimensions: ResolvedLayoutConfig.Dimensions.createCopy(original.dimensions),
            header: ResolvedLayoutConfig.Header.createCopy(original.header),
            parentId: original.parentId,
            indexInParent: original.indexInParent,
            window: ResolvedPopoutLayoutConfig.Window.createCopy(original.window),
            resolved: original.resolved,
        };
        return result;
    }
    ResolvedPopoutLayoutConfig.createCopy = createCopy;
})(ResolvedPopoutLayoutConfig = exports.ResolvedPopoutLayoutConfig || (exports.ResolvedPopoutLayoutConfig = {}));

},{"../errors/internal-error":17,"../utils/config-minifier":26,"../utils/types":32,"../utils/utils":33}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentContainer = void 0;
const config_1 = require("../config/config");
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("../utils/event-emitter");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
/** @public */
class ComponentContainer extends event_emitter_1.EventEmitter {
    /** @internal */
    constructor(
    /** @internal */
    _config, 
    /** @internal */
    _parent, 
    /** @internal */
    _layoutManager, 
    /** @internal */
    _element, 
    /** @internal */
    _updateItemConfigEvent, 
    /** @internal */
    _showEvent, 
    /** @internal */
    _hideEvent, 
    /** @internal */
    _focusEvent, 
    /** @internal */
    _blurEvent) {
        super();
        this._config = _config;
        this._parent = _parent;
        this._layoutManager = _layoutManager;
        this._element = _element;
        this._updateItemConfigEvent = _updateItemConfigEvent;
        this._showEvent = _showEvent;
        this._hideEvent = _hideEvent;
        this._focusEvent = _focusEvent;
        this._blurEvent = _blurEvent;
        /** @internal */
        this._stackMaximised = false;
        this._width = 0;
        this._height = 0;
        this._visible = true;
        this._isShownWithZeroDimensions = true;
        this._componentType = _config.componentType;
        this._isClosable = _config.isClosable;
        this._initialState = _config.componentState;
        this._state = this._initialState;
        this._boundComponent = this.layoutManager.bindComponent(this, _config);
        this.updateElementPositionPropertyFromBoundComponent();
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get parent() { return this._parent; }
    /** @internal @deprecated use {@link (ComponentContainer:class).componentType} */
    get componentName() { return this._componentType; }
    get componentType() { return this._componentType; }
    get virtual() { return this._boundComponent.virtual; }
    get component() { return this._boundComponent.component; }
    get tab() { return this._tab; }
    get title() { return this._parent.title; }
    get layoutManager() { return this._layoutManager; }
    get isHidden() { return !this._visible; }
    get visible() { return this._visible; }
    get state() { return this._state; }
    /** Return the initial component state */
    get initialState() { return this._initialState; }
    /** The inner DOM element where the container's content is intended to live in */
    get element() { return this._element; }
    /** @internal */
    destroy() {
        this.releaseComponent();
        this.stateRequestEvent = undefined;
        this.emit('destroy');
    }
    /** @deprecated use {@link (ComponentContainer:class).element } */
    getElement() {
        return this._element;
    }
    /**
     * Hides the container's component item (and hence, the container) if not already hidden.
     * Emits hide event prior to hiding the container.
     */
    hide() {
        this._hideEvent();
    }
    /**
     * Shows the container's component item (and hence, the container) if not visible.
     * Emits show event prior to hiding the container.
     */
    show() {
        this._showEvent();
    }
    /**
     * Focus this component in Layout.
     */
    focus(suppressEvent = false) {
        this._focusEvent(suppressEvent);
    }
    /**
     * Remove focus from this component in Layout.
     */
    blur(suppressEvent = false) {
        this._blurEvent(suppressEvent);
    }
    /**
     * Set the size from within the container. Traverses up
     * the item tree until it finds a row or column element
     * and resizes its items accordingly.
     *
     * If this container isn't a descendant of a row or column
     * it returns false
     * @param width - The new width in pixel
     * @param height - The new height in pixel
     *
     * @returns resizeSuccesful
     *
     * @internal
     */
    setSize(width, height) {
        let ancestorItem = this._parent;
        if (ancestorItem.isColumn || ancestorItem.isRow || ancestorItem.parent === null) {
            throw new internal_error_1.AssertError('ICSSPRC', 'ComponentContainer cannot have RowColumn Parent');
        }
        else {
            let ancestorChildItem;
            do {
                ancestorChildItem = ancestorItem;
                ancestorItem = ancestorItem.parent;
            } while (ancestorItem !== null && !ancestorItem.isColumn && !ancestorItem.isRow);
            if (ancestorItem === null) {
                // no Row or Column found
                return false;
            }
            else {
                // ancestorItem is Row or Column
                const direction = ancestorItem.isColumn ? 'height' : 'width';
                const currentSize = this[direction];
                if (currentSize === null) {
                    throw new internal_error_1.UnexpectedNullError('ICSSCS11194');
                }
                else {
                    const newSize = direction === 'height' ? height : width;
                    const totalPixel = currentSize * (1 / (ancestorChildItem.size / 100));
                    const percentage = (newSize / totalPixel) * 100;
                    const delta = (ancestorChildItem.size - percentage) / (ancestorItem.contentItems.length - 1);
                    for (let i = 0; i < ancestorItem.contentItems.length; i++) {
                        const ancestorItemContentItem = ancestorItem.contentItems[i];
                        if (ancestorItemContentItem === ancestorChildItem) {
                            ancestorItemContentItem.size = percentage;
                        }
                        else {
                            ancestorItemContentItem.size += delta;
                        }
                    }
                    ancestorItem.updateSize(false);
                    return true;
                }
            }
        }
    }
    /**
     * Closes the container if it is closable. Can be called by
     * both the component within at as well as the contentItem containing
     * it. Emits a close event before the container itself is closed.
     */
    close() {
        if (this._isClosable) {
            this.emit('close');
            this._parent.close();
        }
    }
    /** Replaces component without affecting layout */
    replaceComponent(itemConfig) {
        this.releaseComponent();
        if (!config_1.ItemConfig.isComponent(itemConfig)) {
            throw new Error('ReplaceComponent not passed a component ItemConfig');
        }
        else {
            const config = config_1.ComponentItemConfig.resolve(itemConfig, false);
            this._initialState = config.componentState;
            this._state = this._initialState;
            this._componentType = config.componentType;
            this._updateItemConfigEvent(config);
            this._boundComponent = this.layoutManager.bindComponent(this, config);
            this.updateElementPositionPropertyFromBoundComponent();
            if (this._boundComponent.virtual) {
                if (this.virtualVisibilityChangeRequiredEvent !== undefined) {
                    this.virtualVisibilityChangeRequiredEvent(this, this._visible);
                }
                if (this.virtualRectingRequiredEvent !== undefined) {
                    this._layoutManager.fireBeforeVirtualRectingEvent(1);
                    try {
                        this.virtualRectingRequiredEvent(this, this._width, this._height);
                    }
                    finally {
                        this._layoutManager.fireAfterVirtualRectingEvent();
                    }
                }
                this.setBaseLogicalZIndex();
            }
            this.emit('stateChanged');
        }
    }
    /**
     * Returns the initial component state or the latest passed in setState()
     * @returns state
     * @deprecated Use {@link (ComponentContainer:class).initialState}
     */
    getState() {
        return this._state;
    }
    /**
     * Merges the provided state into the current one
     * @deprecated Use {@link (ComponentContainer:class).stateRequestEvent}
     */
    extendState(state) {
        const extendedState = (0, utils_1.deepExtend)(this._state, state);
        this.setState(extendedState);
    }
    /**
     * Sets the component state
     * @deprecated Use {@link (ComponentContainer:class).stateRequestEvent}
     */
    setState(state) {
        this._state = state;
        this._parent.emitBaseBubblingEvent('stateChanged');
    }
    /**
     * Set's the components title
     */
    setTitle(title) {
        this._parent.setTitle(title);
    }
    /** @internal */
    setTab(tab) {
        this._tab = tab;
        this.emit('tab', tab);
    }
    /** @internal */
    setVisibility(value) {
        if (this._boundComponent.virtual) {
            if (this.virtualVisibilityChangeRequiredEvent !== undefined) {
                this.virtualVisibilityChangeRequiredEvent(this, value);
            }
        }
        if (value) {
            if (!this._visible) {
                this._visible = true;
                if (this._height === 0 && this._width === 0) {
                    this._isShownWithZeroDimensions = true;
                }
                else {
                    this._isShownWithZeroDimensions = false;
                    this.setSizeToNodeSize(this._width, this._height, true);
                    this.emitShow();
                }
            }
            else {
                if (this._isShownWithZeroDimensions && (this._height !== 0 || this._width !== 0)) {
                    this._isShownWithZeroDimensions = false;
                    this.setSizeToNodeSize(this._width, this._height, true);
                    this.emitShow();
                }
            }
        }
        else {
            if (this._visible) {
                this._visible = false;
                this._isShownWithZeroDimensions = false;
                this.emitHide();
            }
        }
    }
    setBaseLogicalZIndex() {
        this.setLogicalZIndex(types_1.LogicalZIndex.base);
    }
    setLogicalZIndex(logicalZIndex) {
        if (logicalZIndex !== this._logicalZIndex) {
            this._logicalZIndex = logicalZIndex;
            this.notifyVirtualZIndexChangeRequired();
        }
    }
    /**
     * Set the container's size, but considered temporary (for dragging)
     * so don't emit any events.
     * @internal
     */
    enterDragMode(width, height) {
        this._width = width;
        this._height = height;
        (0, utils_1.setElementWidth)(this._element, width);
        (0, utils_1.setElementHeight)(this._element, height);
        this.setLogicalZIndex(types_1.LogicalZIndex.drag);
        this.drag();
    }
    /** @internal */
    exitDragMode() {
        this.setBaseLogicalZIndex();
    }
    /** @internal */
    enterStackMaximised() {
        this._stackMaximised = true;
        this.setLogicalZIndex(types_1.LogicalZIndex.stackMaximised);
    }
    /** @internal */
    exitStackMaximised() {
        this.setBaseLogicalZIndex();
        this._stackMaximised = false;
    }
    /** @internal */
    drag() {
        if (this._boundComponent.virtual) {
            if (this.virtualRectingRequiredEvent !== undefined) {
                this._layoutManager.fireBeforeVirtualRectingEvent(1);
                try {
                    this.virtualRectingRequiredEvent(this, this._width, this._height);
                }
                finally {
                    this._layoutManager.fireAfterVirtualRectingEvent();
                }
            }
        }
    }
    /**
     * Sets the container's size. Called by the container's component item.
     * To instead set the size programmatically from within the component itself,
     * use the public setSize method
     * @param width - in px
     * @param height - in px
     * @param force - set even if no change
     * @internal
     */
    setSizeToNodeSize(width, height, force) {
        if (width !== this._width || height !== this._height || force) {
            this._width = width;
            this._height = height;
            (0, utils_1.setElementWidth)(this._element, width);
            (0, utils_1.setElementHeight)(this._element, height);
            if (this._boundComponent.virtual) {
                this.addVirtualSizedContainerToLayoutManager();
            }
            else {
                this.emit('resize');
                this.checkShownFromZeroDimensions();
            }
        }
    }
    /** @internal */
    notifyVirtualRectingRequired() {
        if (this.virtualRectingRequiredEvent !== undefined) {
            this.virtualRectingRequiredEvent(this, this._width, this._height);
            this.emit('resize');
            this.checkShownFromZeroDimensions();
        }
    }
    /** @internal */
    notifyVirtualZIndexChangeRequired() {
        if (this.virtualZIndexChangeRequiredEvent !== undefined) {
            const logicalZIndex = this._logicalZIndex;
            const defaultZIndex = types_1.LogicalZIndexToDefaultMap[logicalZIndex];
            this.virtualZIndexChangeRequiredEvent(this, logicalZIndex, defaultZIndex);
        }
    }
    /** @internal */
    updateElementPositionPropertyFromBoundComponent() {
        if (this._boundComponent.virtual) {
            this._element.style.position = 'static';
        }
        else {
            this._element.style.position = ''; // set it back to attribute value
        }
    }
    /** @internal */
    addVirtualSizedContainerToLayoutManager() {
        this._layoutManager.beginVirtualSizedContainerAdding();
        try {
            this._layoutManager.addVirtualSizedContainer(this);
        }
        finally {
            this._layoutManager.endVirtualSizedContainerAdding();
        }
    }
    /** @internal */
    checkShownFromZeroDimensions() {
        if (this._isShownWithZeroDimensions && (this._height !== 0 || this._width !== 0)) {
            this._isShownWithZeroDimensions = false;
            this.emitShow();
        }
    }
    /** @internal */
    emitShow() {
        this.emit('shown');
        this.emit('show');
    }
    /** @internal */
    emitHide() {
        this.emit('hide');
    }
    /** @internal */
    releaseComponent() {
        if (this._stackMaximised) {
            this.exitStackMaximised();
        }
        this.emit('beforeComponentRelease', this._boundComponent.component);
        this.layoutManager.unbindComponent(this, this._boundComponent.virtual, this._boundComponent.component);
    }
}
exports.ComponentContainer = ComponentContainer;

},{"../config/config":3,"../errors/internal-error":17,"../utils/event-emitter":28,"../utils/types":32,"../utils/utils":33}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserPopout = void 0;
const resolved_config_1 = require("../config/resolved-config");
const external_error_1 = require("../errors/external-error");
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("../utils/event-emitter");
const utils_1 = require("../utils/utils");
/**
 * Pops a content item out into a new browser window.
 * This is achieved by
 *
 *    - Creating a new configuration with the content item as root element
 *    - Serializing and minifying the configuration
 *    - Opening the current window's URL with the configuration as a GET parameter
 *    - GoldenLayout when opened in the new window will look for the GET parameter
 *      and use it instead of the provided configuration
 * @public
 */
class BrowserPopout extends event_emitter_1.EventEmitter {
    /**
     * @param _config - GoldenLayout item config
     * @param _initialWindowSize - A map with width, height, top and left
     * @internal
     */
    constructor(
    /** @internal */
    _config, 
    /** @internal */
    _initialWindowSize, 
    /** @internal */
    _layoutManager) {
        super();
        this._config = _config;
        this._initialWindowSize = _initialWindowSize;
        this._layoutManager = _layoutManager;
        this._isInitialised = false;
        this._popoutWindow = null;
        this.createWindow();
    }
    toConfig() {
        var _a, _b;
        if (this._isInitialised === false) {
            throw new Error('Can\'t create config, layout not yet initialised');
        }
        const glInstance = this.getGlInstance();
        const glInstanceConfig = glInstance.saveLayout();
        let left;
        let top;
        if (this._popoutWindow === null) {
            left = null;
            top = null;
        }
        else {
            left = (_a = this._popoutWindow.screenX) !== null && _a !== void 0 ? _a : this._popoutWindow.screenLeft;
            top = (_b = this._popoutWindow.screenY) !== null && _b !== void 0 ? _b : this._popoutWindow.screenTop;
        }
        const window = {
            width: this.getGlInstance().width,
            height: this.getGlInstance().height,
            left,
            top,
        };
        const config = {
            root: glInstanceConfig.root,
            openPopouts: glInstanceConfig.openPopouts,
            settings: glInstanceConfig.settings,
            dimensions: glInstanceConfig.dimensions,
            header: glInstanceConfig.header,
            window,
            parentId: this._config.parentId,
            indexInParent: this._config.indexInParent,
            resolved: true,
        };
        return config;
    }
    getGlInstance() {
        if (this._popoutWindow === null) {
            throw new internal_error_1.UnexpectedNullError('BPGGI24693');
        }
        return this._popoutWindow.__glInstance;
    }
    /**
     * Retrieves the native BrowserWindow backing this popout.
     * Might throw an UnexpectedNullError exception when the window is not initialized yet.
     * @public
     */
    getWindow() {
        if (this._popoutWindow === null) {
            throw new internal_error_1.UnexpectedNullError('BPGW087215');
        }
        return this._popoutWindow;
    }
    close() {
        if (this.getGlInstance()) {
            this.getGlInstance().closeWindow();
        }
        else {
            try {
                this.getWindow().close();
            }
            catch (e) {
                //
            }
        }
    }
    /**
     * Returns the popped out item to its original position. If the original
     * parent isn't available anymore it falls back to the layout's topmost element
     */
    popIn() {
        let parentItem;
        let index = this._config.indexInParent;
        if (!this._config.parentId) {
            return;
        }
        /*
        * The deepExtend call seems a bit pointless, but it's crucial to
        * copy the config returned by this.getGlInstance().toConfig()
        * onto a new object. Internet Explorer keeps the references
        * to objects on the child window, resulting in the following error
        * once the child window is closed:
        *
        * The callee (server [not server application]) is not available and disappeared
        */
        const glInstanceLayoutConfig = this.getGlInstance().saveLayout();
        const copiedGlInstanceLayoutConfig = (0, utils_1.deepExtend)({}, glInstanceLayoutConfig);
        const copiedRoot = copiedGlInstanceLayoutConfig.root;
        if (copiedRoot === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('BPPIR19998');
        }
        const groundItem = this._layoutManager.groundItem;
        if (groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('BPPIG34972');
        }
        parentItem = groundItem.getItemsByPopInParentId(this._config.parentId)[0];
        /*
        * Fallback if parentItem is not available. Either add it to the topmost
        * item or make it the topmost item if the layout is empty
        */
        if (!parentItem) {
            if (groundItem.contentItems.length > 0) {
                parentItem = groundItem.contentItems[0];
            }
            else {
                parentItem = groundItem;
            }
            index = 0;
        }
        const newContentItem = this._layoutManager.createAndInitContentItem(copiedRoot, parentItem);
        parentItem.addChild(newContentItem, index);
        if (this._layoutManager.layoutConfig.settings.popInOnClose) {
            this._onClose();
        }
        else {
            this.close();
        }
    }
    /**
     * Creates the URL and window parameter
     * and opens a new window
     * @internal
     */
    createWindow() {
        const url = this.createUrl();
        /**
         * Bogus title to prevent re-usage of existing window with the
         * same title. The actual title will be set by the new window's
         * GoldenLayout instance if it detects that it is in subWindowMode
         */
        const target = Math.floor(Math.random() * 1000000).toString(36);
        /**
         * The options as used in the window.open string
         */
        const features = this.serializeWindowFeatures({
            width: this._initialWindowSize.width,
            height: this._initialWindowSize.height,
            innerWidth: this._initialWindowSize.width,
            innerHeight: this._initialWindowSize.height,
            menubar: 'no',
            toolbar: 'no',
            location: 'no',
            personalbar: 'no',
            resizable: 'yes',
            scrollbars: 'no',
            status: 'no'
        });
        this._popoutWindow = globalThis.open(url, target, features);
        if (!this._popoutWindow) {
            if (this._layoutManager.layoutConfig.settings.blockedPopoutsThrowError === true) {
                const error = new external_error_1.PopoutBlockedError('Popout blocked');
                throw error;
            }
            else {
                return;
            }
        }
        this._popoutWindow.addEventListener('load', () => this.positionWindow(), { passive: true });
        this._popoutWindow.addEventListener('beforeunload', () => {
            if (this._layoutManager.layoutConfig.settings.popInOnClose) {
                this.popIn();
            }
            else {
                this._onClose();
            }
        }, { passive: true });
        /**
         * Polling the childwindow to find out if GoldenLayout has been initialised
         * doesn't seem optimal, but the alternatives - adding a callback to the parent
         * window or raising an event on the window object - both would introduce knowledge
         * about the parent to the child window which we'd rather avoid
         */
        this._checkReadyInterval = setInterval(() => this.checkReady(), 10);
    }
    /** @internal */
    checkReady() {
        if (this._popoutWindow === null) {
            throw new internal_error_1.UnexpectedNullError('BPCR01844');
        }
        else {
            if (this._popoutWindow.__glInstance && this._popoutWindow.__glInstance.isInitialised) {
                this.onInitialised();
                if (this._checkReadyInterval !== undefined) {
                    clearInterval(this._checkReadyInterval);
                    this._checkReadyInterval = undefined;
                }
            }
        }
    }
    /**
     * Serialises a map of key:values to a window options string
     *
     * @param windowOptions -
     *
     * @returns serialised window options
     * @internal
     */
    serializeWindowFeatures(windowOptions) {
        const windowOptionsString = [];
        for (const key in windowOptions) {
            windowOptionsString.push(key + '=' + windowOptions[key].toString());
        }
        return windowOptionsString.join(',');
    }
    /**
     * Creates the URL for the new window, including the
     * config GET parameter
     *
     * @returns URL
     * @internal
     */
    createUrl() {
        const storageKey = 'gl-window-config-' + (0, utils_1.getUniqueId)();
        const config = resolved_config_1.ResolvedLayoutConfig.minifyConfig(this._config);
        try {
            localStorage.setItem(storageKey, JSON.stringify(config));
        }
        catch (e) {
            throw new Error('Error while writing to localStorage ' + (0, utils_1.getErrorMessage)(e));
        }
        const url = new URL(location.href);
        url.searchParams.set('gl-window', storageKey);
        return url.toString();
    }
    /**
     * Move the newly created window roughly to
     * where the component used to be.
     * @internal
     */
    positionWindow() {
        if (this._popoutWindow === null) {
            throw new Error('BrowserPopout.positionWindow: null popoutWindow');
        }
        else {
            this._popoutWindow.moveTo(this._initialWindowSize.left, this._initialWindowSize.top);
            this._popoutWindow.focus();
        }
    }
    /**
     * Callback when the new window is opened and the GoldenLayout instance
     * within it is initialised
     * @internal
     */
    onInitialised() {
        this._isInitialised = true;
        this.getGlInstance().on('popIn', () => this.popIn());
        this.emit('initialised');
    }
    /**
     * Invoked 50ms after the window unload event
     * @internal
     */
    _onClose() {
        setTimeout(() => this.emit('closed'), 50);
    }
}
exports.BrowserPopout = BrowserPopout;

},{"../config/resolved-config":4,"../errors/external-error":16,"../errors/internal-error":17,"../utils/event-emitter":28,"../utils/utils":33}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragProxy = void 0;
const internal_error_1 = require("../errors/internal-error");
const stack_1 = require("../items/stack");
const event_emitter_1 = require("../utils/event-emitter");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
/**
 * This class creates a temporary container
 * for the component whilst it is being dragged
 * and handles drag events
 * @internal
 */
class DragProxy extends event_emitter_1.EventEmitter {
    /**
     * @param x - The initial x position
     * @param y - The initial y position
     * @internal
     */
    constructor(x, y, _dragListener, _layoutManager, _componentItem, _originalParent) {
        super();
        this._dragListener = _dragListener;
        this._layoutManager = _layoutManager;
        this._componentItem = _componentItem;
        this._originalParent = _originalParent;
        this._area = null;
        this._lastValidArea = null;
        this._dragListener.on('drag', (offsetX, offsetY, event) => this.onDrag(offsetX, offsetY, event));
        this._dragListener.on('dragStop', () => this.onDrop());
        this.createDragProxyElements(x, y);
        if (this._componentItem.parent === null) {
            // Note that _contentItem will have dummy GroundItem as parent if initiated by a external drag source
            throw new internal_error_1.UnexpectedNullError('DPC10097');
        }
        this._componentItemFocused = this._componentItem.focused;
        if (this._componentItemFocused) {
            this._componentItem.blur();
        }
        this._componentItem.parent.removeChild(this._componentItem, true);
        this.setDimensions();
        document.body.appendChild(this._element);
        this.determineMinMaxXY();
        this._layoutManager.calculateItemAreas();
        this.setDropPosition(x, y);
    }
    get element() { return this._element; }
    /** Create Stack-like structure to contain the dragged component */
    createDragProxyElements(initialX, initialY) {
        this._element = document.createElement('div');
        this._element.classList.add("lm_dragProxy" /* DragProxy */);
        const headerElement = document.createElement('div');
        headerElement.classList.add("lm_header" /* Header */);
        const tabsElement = document.createElement('div');
        tabsElement.classList.add("lm_tabs" /* Tabs */);
        const tabElement = document.createElement('div');
        tabElement.classList.add("lm_tab" /* Tab */);
        const titleElement = document.createElement('span');
        titleElement.classList.add("lm_title" /* Title */);
        tabElement.appendChild(titleElement);
        tabsElement.appendChild(tabElement);
        headerElement.appendChild(tabsElement);
        this._proxyContainerElement = document.createElement('div');
        this._proxyContainerElement.classList.add("lm_content" /* Content */);
        this._element.appendChild(headerElement);
        this._element.appendChild(this._proxyContainerElement);
        if (this._originalParent instanceof stack_1.Stack && this._originalParent.headerShow) {
            this._sided = this._originalParent.headerLeftRightSided;
            this._element.classList.add('lm_' + this._originalParent.headerSide);
            if ([types_1.Side.right, types_1.Side.bottom].indexOf(this._originalParent.headerSide) >= 0) {
                this._proxyContainerElement.insertAdjacentElement('afterend', headerElement);
            }
        }
        this._element.style.left = (0, utils_1.numberToPixels)(initialX);
        this._element.style.top = (0, utils_1.numberToPixels)(initialY);
        tabElement.setAttribute('title', this._componentItem.title);
        titleElement.insertAdjacentText('afterbegin', this._componentItem.title);
        this._proxyContainerElement.appendChild(this._componentItem.element);
    }
    determineMinMaxXY() {
        const groundItem = this._layoutManager.groundItem;
        if (groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('DPDMMXY73109');
        }
        else {
            const groundElement = groundItem.element;
            const rect = groundElement.getBoundingClientRect();
            this._minX = rect.left + document.body.scrollLeft;
            this._minY = rect.top + document.body.scrollTop;
            this._maxX = this._minX + rect.width;
            this._maxY = this._minY + rect.height;
        }
    }
    /**
     * Callback on every mouseMove event during a drag. Determines if the drag is
     * still within the valid drag area and calls the layoutManager to highlight the
     * current drop area
     *
     * @param offsetX - The difference from the original x position in px
     * @param offsetY - The difference from the original y position in px
     * @param event -
     * @internal
     */
    onDrag(offsetX, offsetY, event) {
        const x = event.pageX;
        const y = event.pageY;
        this.setDropPosition(x, y);
        this._componentItem.drag();
    }
    /**
     * Sets the target position, highlighting the appropriate area
     *
     * @param x - The x position in px
     * @param y - The y position in px
     *
     * @internal
     */
    setDropPosition(x, y) {
        if (this._layoutManager.layoutConfig.settings.constrainDragToContainer) {
            if (x <= this._minX) {
                x = Math.ceil(this._minX);
            }
            else if (x >= this._maxX) {
                x = Math.floor(this._maxX);
            }
            if (y <= this._minY) {
                y = Math.ceil(this._minY);
            }
            else if (y >= this._maxY) {
                y = Math.floor(this._maxY);
            }
        }
        this._element.style.left = (0, utils_1.numberToPixels)(x);
        this._element.style.top = (0, utils_1.numberToPixels)(y);
        this._area = this._layoutManager.getArea(x, y);
        if (this._area !== null) {
            this._lastValidArea = this._area;
            this._area.contentItem.highlightDropZone(x, y, this._area);
        }
    }
    /**
     * Callback when the drag has finished. Determines the drop area
     * and adds the child to it
     * @internal
     */
    onDrop() {
        const dropTargetIndicator = this._layoutManager.dropTargetIndicator;
        if (dropTargetIndicator === null) {
            throw new internal_error_1.UnexpectedNullError('DPOD30011');
        }
        else {
            dropTargetIndicator.hide();
        }
        this._componentItem.exitDragMode();
        /*
         * Valid drop area found
         */
        let droppedComponentItem;
        if (this._area !== null) {
            droppedComponentItem = this._componentItem;
            this._area.contentItem.onDrop(droppedComponentItem, this._area);
            /**
             * No valid drop area available at present, but one has been found before.
             * Use it
             */
        }
        else if (this._lastValidArea !== null) {
            droppedComponentItem = this._componentItem;
            const newParentContentItem = this._lastValidArea.contentItem;
            newParentContentItem.onDrop(droppedComponentItem, this._lastValidArea);
            /**
             * No valid drop area found during the duration of the drag. Return
             * content item to its original position if a original parent is provided.
             * (Which is not the case if the drag had been initiated by createDragSource)
             */
        }
        else if (this._originalParent) {
            droppedComponentItem = this._componentItem;
            this._originalParent.addChild(droppedComponentItem);
            /**
             * The drag didn't ultimately end up with adding the content item to
             * any container. In order to ensure clean up happens, destroy the
             * content item.
             */
        }
        else {
            this._componentItem.destroy(); // contentItem children are now destroyed as well
        }
        this._element.remove();
        this._layoutManager.emit('itemDropped', this._componentItem);
        if (this._componentItemFocused && droppedComponentItem !== undefined) {
            droppedComponentItem.focus();
        }
    }
    /**
     * Updates the Drag Proxy's dimensions
     * @internal
     */
    setDimensions() {
        const dimensions = this._layoutManager.layoutConfig.dimensions;
        if (dimensions === undefined) {
            throw new Error('DragProxy.setDimensions: dimensions undefined');
        }
        let width = dimensions.dragProxyWidth;
        let height = dimensions.dragProxyHeight;
        if (width === undefined || height === undefined) {
            throw new Error('DragProxy.setDimensions: width and/or height undefined');
        }
        const headerHeight = this._layoutManager.layoutConfig.header.show === false ? 0 : dimensions.headerHeight;
        this._element.style.width = (0, utils_1.numberToPixels)(width);
        this._element.style.height = (0, utils_1.numberToPixels)(height);
        width -= (this._sided ? headerHeight : 0);
        height -= (!this._sided ? headerHeight : 0);
        this._proxyContainerElement.style.width = (0, utils_1.numberToPixels)(width);
        this._proxyContainerElement.style.height = (0, utils_1.numberToPixels)(height);
        this._componentItem.enterDragMode(width, height);
        this._componentItem.show();
    }
}
exports.DragProxy = DragProxy;

},{"../errors/internal-error":17,"../items/stack":24,"../utils/event-emitter":28,"../utils/types":32,"../utils/utils":33}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragSource = void 0;
const config_1 = require("../config/config"); // remove alias in version 3
const resolved_config_1 = require("../config/resolved-config");
const internal_error_1 = require("../errors/internal-error");
const component_item_1 = require("../items/component-item");
const ground_item_1 = require("../items/ground-item");
const drag_listener_1 = require("../utils/drag-listener");
const drag_proxy_1 = require("./drag-proxy");
/**
 * Allows for any DOM item to create a component on drag
 * start to be dragged into the Layout
 * @public
 */
class DragSource {
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager, 
    /** @internal */
    _element, 
    /** @internal */
    _extraAllowableChildTargets, 
    /** @internal @deprecated replace with componentItemConfigOrFtn in version 3 */
    _componentTypeOrFtn, 
    /** @internal @deprecated remove in version 3 */
    _componentState, 
    /** @internal @deprecated remove in version 3 */
    _title, 
    /** @internal @deprecated remove in version 3 */
    _id) {
        this._layoutManager = _layoutManager;
        this._element = _element;
        this._extraAllowableChildTargets = _extraAllowableChildTargets;
        this._componentTypeOrFtn = _componentTypeOrFtn;
        this._componentState = _componentState;
        this._title = _title;
        this._id = _id;
        this._dragListener = null;
        this._dummyGroundContainer = document.createElement('div');
        const dummyRootItemConfig = resolved_config_1.ResolvedRowOrColumnItemConfig.createDefault('row');
        this._dummyGroundContentItem = new ground_item_1.GroundItem(this._layoutManager, dummyRootItemConfig, this._dummyGroundContainer);
        this.createDragListener();
    }
    /**
     * Disposes of the drag listeners so the drag source is not usable any more.
     * @internal
     */
    destroy() {
        this.removeDragListener();
    }
    /**
     * Called initially and after every drag
     * @internal
     */
    createDragListener() {
        this.removeDragListener();
        this._dragListener = new drag_listener_1.DragListener(this._element, this._extraAllowableChildTargets);
        this._dragListener.on('dragStart', (x, y) => this.onDragStart(x, y));
        this._dragListener.on('dragStop', () => this.onDragStop());
    }
    /**
     * Callback for the DragListener's dragStart event
     *
     * @param x - The x position of the mouse on dragStart
     * @param y - The x position of the mouse on dragStart
     * @internal
     */
    onDragStart(x, y) {
        var _a;
        const type = 'component';
        let dragSourceItemConfig;
        if (typeof this._componentTypeOrFtn === "function") {
            const ftnDragSourceItemConfig = this._componentTypeOrFtn();
            // If the componentType property exists, then it is already a ComponentItemConfig so nothing to do
            if (DragSource.isDragSourceComponentItemConfig(ftnDragSourceItemConfig)) {
                dragSourceItemConfig = {
                    type,
                    componentState: ftnDragSourceItemConfig.state,
                    componentType: ftnDragSourceItemConfig.type,
                    title: (_a = ftnDragSourceItemConfig.title) !== null && _a !== void 0 ? _a : this._title,
                };
            }
            else {
                dragSourceItemConfig = ftnDragSourceItemConfig;
            }
        }
        else {
            dragSourceItemConfig = {
                type,
                componentState: this._componentState,
                componentType: this._componentTypeOrFtn,
                title: this._title,
                id: this._id,
            };
        }
        // Create a dummy ContentItem only for drag purposes
        // All ContentItems (except for GroundItem) need a parent.  When dragging, the parent is not used.
        // Instead of allowing null parents (as Javascript version did), use a temporary dummy GroundItem parent and add ContentItem to that
        // If this does not work, need to create alternative GroundItem class
        const resolvedItemConfig = config_1.ComponentItemConfig.resolve(dragSourceItemConfig, false);
        const componentItem = new component_item_1.ComponentItem(this._layoutManager, resolvedItemConfig, this._dummyGroundContentItem);
        this._dummyGroundContentItem.contentItems.push(componentItem);
        if (this._dragListener === null) {
            throw new internal_error_1.UnexpectedNullError('DSODSD66746');
        }
        else {
            const dragProxy = new drag_proxy_1.DragProxy(x, y, this._dragListener, this._layoutManager, componentItem, this._dummyGroundContentItem);
            const transitionIndicator = this._layoutManager.transitionIndicator;
            if (transitionIndicator === null) {
                throw new internal_error_1.UnexpectedNullError('DSODST66746');
            }
            else {
                transitionIndicator.transitionElements(this._element, dragProxy.element);
            }
        }
    }
    /** @internal */
    onDragStop() {
        // if (this._dummyGroundContentItem === undefined) {
        //     throw new UnexpectedUndefinedError('DSODSDRU08116');
        // } else {
        //     this._dummyGroundContentItem._$destroy
        //     this._dummyGroundContentItem = undefined;
        // }
        this.createDragListener();
    }
    /**
     * Called after every drag and when the drag source is being disposed of.
     * @internal
     */
    removeDragListener() {
        if (this._dragListener !== null) {
            this._dragListener.destroy();
            this._dragListener = null;
        }
    }
}
exports.DragSource = DragSource;
/** @public */
(function (DragSource) {
    /** @deprecated remove in version 3 */
    function isDragSourceComponentItemConfig(config) {
        return !("componentType" in config);
    }
    DragSource.isDragSourceComponentItemConfig = isDragSourceComponentItemConfig;
})(DragSource = exports.DragSource || (exports.DragSource = {}));

},{"../config/config":3,"../config/resolved-config":4,"../errors/internal-error":17,"../items/component-item":19,"../items/ground-item":22,"../utils/drag-listener":27,"./drag-proxy":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropTargetIndicator = void 0;
const utils_1 = require("../utils/utils");
/** @internal */
class DropTargetIndicator {
    constructor() {
        // Maybe use container instead of Document Body?
        this._element = document.createElement('div');
        this._element.classList.add("lm_dropTargetIndicator" /* DropTargetIndicator */);
        const innerElement = document.createElement('div');
        innerElement.classList.add("lm_inner" /* Inner */);
        this._element.appendChild(innerElement);
        document.body.appendChild(this._element);
    }
    destroy() {
        this._element.remove();
    }
    highlightArea(area, margin) {
        this._element.style.left = (0, utils_1.numberToPixels)(area.x1 + margin);
        this._element.style.top = (0, utils_1.numberToPixels)(area.y1 + margin);
        this._element.style.width = (0, utils_1.numberToPixels)(area.x2 - area.x1 - margin);
        this._element.style.height = (0, utils_1.numberToPixels)(area.y2 - area.y1 - margin);
        this._element.style.display = 'block';
    }
    hide() {
        (0, utils_1.setElementDisplayVisibility)(this._element, false);
    }
}
exports.DropTargetIndicator = DropTargetIndicator;

},{"../utils/utils":33}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderButton = void 0;
/** @internal */
class HeaderButton {
    constructor(_header, label, cssClass, _pushEvent) {
        this._header = _header;
        this._pushEvent = _pushEvent;
        this._clickEventListener = (ev) => this.onClick(ev);
        this._touchStartEventListener = (ev) => this.onTouchStart(ev);
        this._element = document.createElement('div');
        this._element.classList.add(cssClass);
        this._element.title = label;
        this._header.on('destroy', () => this.destroy());
        this._element.addEventListener('click', this._clickEventListener, { passive: true });
        this._element.addEventListener('touchstart', this._touchStartEventListener, { passive: true });
        this._header.controlsContainerElement.appendChild(this._element);
    }
    get element() { return this._element; }
    destroy() {
        var _a;
        this._element.removeEventListener('click', this._clickEventListener);
        this._element.removeEventListener('touchstart', this._touchStartEventListener);
        (_a = this._element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this._element);
    }
    onClick(ev) {
        this._pushEvent(ev);
    }
    onTouchStart(ev) {
        this._pushEvent(ev);
    }
}
exports.HeaderButton = HeaderButton;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("../utils/event-emitter");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const header_button_1 = require("./header-button");
const tabs_container_1 = require("./tabs-container");
/**
 * This class represents a header above a Stack ContentItem.
 * @public
 */
class Header extends event_emitter_1.EventEmitter {
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager, 
    /** @internal */
    _parent, settings, 
    /** @internal */
    _configClosable, 
    /** @internal */
    _getActiveComponentItemEvent, closeEvent, 
    /** @internal */
    _popoutEvent, 
    /** @internal */
    _maximiseToggleEvent, 
    /** @internal */
    _clickEvent, 
    /** @internal */
    _touchStartEvent, 
    /** @internal */
    _componentRemoveEvent, 
    /** @internal */
    _componentFocusEvent, 
    /** @internal */
    _componentDragStartEvent) {
        super();
        this._layoutManager = _layoutManager;
        this._parent = _parent;
        this._configClosable = _configClosable;
        this._getActiveComponentItemEvent = _getActiveComponentItemEvent;
        this._popoutEvent = _popoutEvent;
        this._maximiseToggleEvent = _maximiseToggleEvent;
        this._clickEvent = _clickEvent;
        this._touchStartEvent = _touchStartEvent;
        this._componentRemoveEvent = _componentRemoveEvent;
        this._componentFocusEvent = _componentFocusEvent;
        this._componentDragStartEvent = _componentDragStartEvent;
        /** @internal */
        this._clickListener = (ev) => this.onClick(ev);
        /** @internal */
        this._touchStartListener = (ev) => this.onTouchStart(ev);
        /** @internal */
        this._rowColumnClosable = true;
        /** @internal */
        this._closeButton = null;
        /** @internal */
        this._popoutButton = null;
        this._tabsContainer = new tabs_container_1.TabsContainer(this._layoutManager, (item) => this.handleTabInitiatedComponentRemoveEvent(item), (item) => this.handleTabInitiatedComponentFocusEvent(item), (x, y, dragListener, item) => this.handleTabInitiatedDragStartEvent(x, y, dragListener, item), () => this.processTabDropdownActiveChanged());
        this._show = settings.show;
        this._popoutEnabled = settings.popoutEnabled;
        this._popoutLabel = settings.popoutLabel;
        this._maximiseEnabled = settings.maximiseEnabled;
        this._maximiseLabel = settings.maximiseLabel;
        this._minimiseEnabled = settings.minimiseEnabled;
        this._minimiseLabel = settings.minimiseLabel;
        this._closeEnabled = settings.closeEnabled;
        this._closeLabel = settings.closeLabel;
        this._tabDropdownEnabled = settings.tabDropdownEnabled;
        this._tabDropdownLabel = settings.tabDropdownLabel;
        this.setSide(settings.side);
        this._canRemoveComponent = this._configClosable;
        this._element = document.createElement('section');
        this._element.classList.add("lm_header" /* Header */);
        this._controlsContainerElement = document.createElement('section');
        this._controlsContainerElement.classList.add("lm_controls" /* Controls */);
        this._element.appendChild(this._tabsContainer.element);
        this._element.appendChild(this._controlsContainerElement);
        this._element.appendChild(this._tabsContainer.dropdownElement);
        this._element.addEventListener('click', this._clickListener, { passive: true });
        this._element.addEventListener('touchstart', this._touchStartListener, { passive: true });
        this._documentMouseUpListener = () => this._tabsContainer.hideAdditionalTabsDropdown();
        globalThis.document.addEventListener('mouseup', this._documentMouseUpListener, { passive: true });
        this._tabControlOffset = this._layoutManager.layoutConfig.settings.tabControlOffset;
        if (this._tabDropdownEnabled) {
            this._tabDropdownButton = new header_button_1.HeaderButton(this, this._tabDropdownLabel, "lm_tabdropdown" /* TabDropdown */, () => this._tabsContainer.showAdditionalTabsDropdown());
        }
        if (this._popoutEnabled) {
            this._popoutButton = new header_button_1.HeaderButton(this, this._popoutLabel, "lm_popout" /* Popout */, () => this.handleButtonPopoutEvent());
        }
        /**
         * Maximise control - set the component to the full size of the layout
         */
        if (this._maximiseEnabled) {
            this._maximiseButton = new header_button_1.HeaderButton(this, this._maximiseLabel, "lm_maximise" /* Maximise */, (ev) => this.handleButtonMaximiseToggleEvent(ev));
        }
        /**
         * Close button
         */
        if (this._configClosable) {
            this._closeButton = new header_button_1.HeaderButton(this, this._closeLabel, "lm_close" /* Close */, () => closeEvent());
        }
        this.processTabDropdownActiveChanged();
    }
    // /** @internal */
    // private _activeComponentItem: ComponentItem | null = null; // only used to identify active tab
    get show() { return this._show; }
    get side() { return this._side; }
    get leftRightSided() { return this._leftRightSided; }
    get layoutManager() { return this._layoutManager; }
    get parent() { return this._parent; }
    get tabs() { return this._tabsContainer.tabs; }
    get lastVisibleTabIndex() { return this._tabsContainer.lastVisibleTabIndex; }
    get element() { return this._element; }
    get tabsContainerElement() { return this._tabsContainer.element; }
    get controlsContainerElement() { return this._controlsContainerElement; }
    /**
     * Destroys the entire header
     * @internal
     */
    destroy() {
        this.emit('destroy');
        this._popoutEvent = undefined;
        this._maximiseToggleEvent = undefined;
        this._clickEvent = undefined;
        this._touchStartEvent = undefined;
        this._componentRemoveEvent = undefined;
        this._componentFocusEvent = undefined;
        this._componentDragStartEvent = undefined;
        this._tabsContainer.destroy();
        globalThis.document.removeEventListener('mouseup', this._documentMouseUpListener);
        this._element.remove();
    }
    /**
     * Creates a new tab and associates it with a contentItem
     * @param index - The position of the tab
     * @internal
     */
    createTab(componentItem, index) {
        this._tabsContainer.createTab(componentItem, index);
    }
    /**
     * Finds a tab based on the contentItem its associated with and removes it.
     * Cannot remove tab if it has the active ComponentItem
     * @internal
     */
    removeTab(componentItem) {
        this._tabsContainer.removeTab(componentItem);
    }
    /** @internal */
    processActiveComponentChanged(newActiveComponentItem) {
        this._tabsContainer.processActiveComponentChanged(newActiveComponentItem);
        this.updateTabSizes();
    }
    /** @internal */
    setSide(value) {
        this._side = value;
        this._leftRightSided = [types_1.Side.right, types_1.Side.left].includes(this._side);
    }
    /**
     * Programmatically set closability.
     * @param value - Whether to enable/disable closability.
     * @returns Whether the action was successful
     * @internal
     */
    setRowColumnClosable(value) {
        this._rowColumnClosable = value;
        this.updateClosability();
    }
    /**
     * Updates the header's closability. If a stack/header is able
     * to close, but has a non closable component added to it, the stack is no
     * longer closable until all components are closable.
     * @internal
     */
    updateClosability() {
        let isClosable;
        if (!this._configClosable) {
            isClosable = false;
        }
        else {
            if (!this._rowColumnClosable) {
                isClosable = false;
            }
            else {
                isClosable = true;
                const len = this.tabs.length;
                for (let i = 0; i < len; i++) {
                    const tab = this._tabsContainer.tabs[i];
                    const item = tab.componentItem;
                    if (!item.isClosable) {
                        isClosable = false;
                        break;
                    }
                }
            }
        }
        if (this._closeButton !== null) {
            (0, utils_1.setElementDisplayVisibility)(this._closeButton.element, isClosable);
        }
        if (this._popoutButton !== null) {
            (0, utils_1.setElementDisplayVisibility)(this._popoutButton.element, isClosable);
        }
        this._canRemoveComponent = isClosable || this._tabsContainer.tabCount > 1;
    }
    /** @internal */
    applyFocusedValue(value) {
        if (value) {
            this._element.classList.add("lm_focused" /* Focused */);
        }
        else {
            this._element.classList.remove("lm_focused" /* Focused */);
        }
    }
    /** @internal */
    processMaximised() {
        if (this._maximiseButton === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('HPMAX16997');
        }
        else {
            this._maximiseButton.element.setAttribute('title', this._minimiseLabel);
        }
    }
    /** @internal */
    processMinimised() {
        if (this._maximiseButton === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('HPMIN16997');
        }
        else {
            this._maximiseButton.element.setAttribute('title', this._maximiseLabel);
        }
    }
    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     * @internal
     */
    updateTabSizes() {
        if (this._tabsContainer.tabCount > 0) {
            const headerHeight = this._show ? this._layoutManager.layoutConfig.dimensions.headerHeight : 0;
            if (this._leftRightSided) {
                this._element.style.height = '';
                this._element.style.width = (0, utils_1.numberToPixels)(headerHeight);
            }
            else {
                this._element.style.width = '';
                this._element.style.height = (0, utils_1.numberToPixels)(headerHeight);
            }
            let availableWidth;
            if (this._leftRightSided) {
                availableWidth = this._element.offsetHeight - this._controlsContainerElement.offsetHeight - this._tabControlOffset;
            }
            else {
                availableWidth = this._element.offsetWidth - this._controlsContainerElement.offsetWidth - this._tabControlOffset;
            }
            this._tabsContainer.updateTabSizes(availableWidth, this._getActiveComponentItemEvent());
        }
    }
    /** @internal */
    handleTabInitiatedComponentRemoveEvent(componentItem) {
        if (this._canRemoveComponent) {
            if (this._componentRemoveEvent === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('HHTCE22294');
            }
            else {
                this._componentRemoveEvent(componentItem);
            }
        }
    }
    /** @internal */
    handleTabInitiatedComponentFocusEvent(componentItem) {
        if (this._componentFocusEvent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('HHTAE22294');
        }
        else {
            this._componentFocusEvent(componentItem);
        }
    }
    /** @internal */
    handleTabInitiatedDragStartEvent(x, y, dragListener, componentItem) {
        if (!this._canRemoveComponent) {
            dragListener.cancelDrag();
        }
        else {
            if (this._componentDragStartEvent === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('HHTDSE22294');
            }
            else {
                this._componentDragStartEvent(x, y, dragListener, componentItem);
            }
        }
    }
    /** @internal */
    processTabDropdownActiveChanged() {
        if (this._tabDropdownButton !== undefined) {
            (0, utils_1.setElementDisplayVisibility)(this._tabDropdownButton.element, this._tabsContainer.dropdownActive);
        }
    }
    /** @internal */
    handleButtonPopoutEvent() {
        if (this._layoutManager.layoutConfig.settings.popoutWholeStack) {
            if (this._popoutEvent === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('HHBPOE17834');
            }
            else {
                this._popoutEvent();
            }
        }
        else {
            const activeComponentItem = this._getActiveComponentItemEvent();
            if (activeComponentItem) {
                activeComponentItem.popout();
            }
            // else: if the stack is empty there won't be an active item (and nothing to popout)
        }
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleButtonMaximiseToggleEvent(ev) {
        if (this._maximiseToggleEvent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('HHBMTE16834');
        }
        else {
            this._maximiseToggleEvent();
        }
    }
    /**
     * Invoked when the header's background is clicked (not it's tabs or controls)
     * @internal
     */
    onClick(event) {
        if (event.target === this._element) {
            this.notifyClick(event);
        }
    }
    /**
     * Invoked when the header's background is touched (not it's tabs or controls)
     * @internal
     */
    onTouchStart(event) {
        if (event.target === this._element) {
            this.notifyTouchStart(event);
        }
    }
    /** @internal */
    notifyClick(ev) {
        if (this._clickEvent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('HNHC46834');
        }
        else {
            this._clickEvent(ev);
        }
    }
    /** @internal */
    notifyTouchStart(ev) {
        if (this._touchStartEvent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('HNHTS46834');
        }
        else {
            this._touchStartEvent(ev);
        }
    }
}
exports.Header = Header;

},{"../errors/internal-error":17,"../utils/event-emitter":28,"../utils/types":32,"../utils/utils":33,"./header-button":10,"./tabs-container":14}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splitter = void 0;
const drag_listener_1 = require("../utils/drag-listener");
const utils_1 = require("../utils/utils");
/** @internal */
class Splitter {
    constructor(_isVertical, _size, grabSize) {
        this._isVertical = _isVertical;
        this._size = _size;
        this._grabSize = grabSize < this._size ? this._size : grabSize;
        this._element = document.createElement('div');
        this._element.classList.add("lm_splitter" /* Splitter */);
        const dragHandleElement = document.createElement('div');
        dragHandleElement.classList.add("lm_drag_handle" /* DragHandle */);
        const handleExcessSize = this._grabSize - this._size;
        const handleExcessPos = handleExcessSize / 2;
        if (this._isVertical) {
            dragHandleElement.style.top = (0, utils_1.numberToPixels)(-handleExcessPos);
            dragHandleElement.style.height = (0, utils_1.numberToPixels)(this._size + handleExcessSize);
            this._element.classList.add("lm_vertical" /* Vertical */);
            this._element.style.height = (0, utils_1.numberToPixels)(this._size);
        }
        else {
            dragHandleElement.style.left = (0, utils_1.numberToPixels)(-handleExcessPos);
            dragHandleElement.style.width = (0, utils_1.numberToPixels)(this._size + handleExcessSize);
            this._element.classList.add("lm_horizontal" /* Horizontal */);
            this._element.style.width = (0, utils_1.numberToPixels)(this._size);
        }
        this._element.appendChild(dragHandleElement);
        this._dragListener = new drag_listener_1.DragListener(this._element, [dragHandleElement]);
    }
    get element() { return this._element; }
    destroy() {
        this._element.remove();
    }
    on(eventName, callback) {
        this._dragListener.on(eventName, callback);
    }
}
exports.Splitter = Splitter;

},{"../utils/drag-listener":27,"../utils/utils":33}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tab = void 0;
const internal_error_1 = require("../errors/internal-error");
const drag_listener_1 = require("../utils/drag-listener");
/**
 * Represents an individual tab within a Stack's header
 * @public
 */
class Tab {
    /** @internal */
    constructor(
    /** @internal */
    _layoutManager, 
    /** @internal */
    _componentItem, 
    /** @internal */
    _closeEvent, 
    /** @internal */
    _focusEvent, 
    /** @internal */
    _dragStartEvent) {
        var _a;
        this._layoutManager = _layoutManager;
        this._componentItem = _componentItem;
        this._closeEvent = _closeEvent;
        this._focusEvent = _focusEvent;
        this._dragStartEvent = _dragStartEvent;
        /** @internal */
        this._isActive = false;
        /** @internal */
        this._tabClickListener = (ev) => this.onTabClickDown(ev);
        /** @internal */
        this._tabTouchStartListener = (ev) => this.onTabTouchStart(ev);
        /** @internal */
        this._closeClickListener = () => this.onCloseClick();
        /** @internal */
        this._closeTouchStartListener = () => this.onCloseTouchStart();
        // /** @internal */
        // private readonly _closeMouseDownListener = () => this.onCloseMousedown();
        /** @internal */
        this._dragStartListener = (x, y) => this.onDragStart(x, y);
        /** @internal */
        this._contentItemDestroyListener = () => this.onContentItemDestroy();
        /** @internal */
        this._tabTitleChangedListener = (title) => this.setTitle(title);
        this._element = document.createElement('div');
        this._element.classList.add("lm_tab" /* Tab */);
        this._titleElement = document.createElement('span');
        this._titleElement.classList.add("lm_title" /* Title */);
        this._closeElement = document.createElement('div');
        this._closeElement.classList.add("lm_close_tab" /* CloseTab */);
        this._element.appendChild(this._titleElement);
        this._element.appendChild(this._closeElement);
        if (_componentItem.isClosable) {
            this._closeElement.style.display = '';
        }
        else {
            this._closeElement.style.display = 'none';
        }
        this.setTitle(_componentItem.title);
        this._componentItem.on('titleChanged', this._tabTitleChangedListener);
        const reorderEnabled = (_a = _componentItem.reorderEnabled) !== null && _a !== void 0 ? _a : this._layoutManager.layoutConfig.settings.reorderEnabled;
        if (reorderEnabled) {
            this.enableReorder();
        }
        this._element.addEventListener('click', this._tabClickListener, { passive: true });
        this._element.addEventListener('touchstart', this._tabTouchStartListener, { passive: true });
        if (this._componentItem.isClosable) {
            this._closeElement.addEventListener('click', this._closeClickListener, { passive: true });
            this._closeElement.addEventListener('touchstart', this._closeTouchStartListener, { passive: true });
            // this._closeElement.addEventListener('mousedown', this._closeMouseDownListener, { passive: true });
        }
        else {
            this._closeElement.remove();
            this._closeElement = undefined;
        }
        this._componentItem.setTab(this);
        this._layoutManager.emit('tabCreated', this);
    }
    get isActive() { return this._isActive; }
    // get header(): Header { return this._header; }
    get componentItem() { return this._componentItem; }
    /** @deprecated use {@link (Tab:class).componentItem} */
    get contentItem() { return this._componentItem; }
    get element() { return this._element; }
    get titleElement() { return this._titleElement; }
    get closeElement() { return this._closeElement; }
    get reorderEnabled() { return this._dragListener !== undefined; }
    set reorderEnabled(value) {
        if (value !== this.reorderEnabled) {
            if (value) {
                this.enableReorder();
            }
            else {
                this.disableReorder();
            }
        }
    }
    /**
     * Sets the tab's title to the provided string and sets
     * its title attribute to a pure text representation (without
     * html tags) of the same string.
     */
    setTitle(title) {
        this._titleElement.innerText = title;
        this._element.title = title;
    }
    /**
     * Sets this tab's active state. To programmatically
     * switch tabs, use Stack.setActiveComponentItem( item ) instead.
     */
    setActive(isActive) {
        if (isActive === this._isActive) {
            return;
        }
        this._isActive = isActive;
        if (isActive) {
            this._element.classList.add("lm_active" /* Active */);
        }
        else {
            this._element.classList.remove("lm_active" /* Active */);
        }
    }
    /**
     * Destroys the tab
     * @internal
     */
    destroy() {
        var _a, _b;
        this._closeEvent = undefined;
        this._focusEvent = undefined;
        this._dragStartEvent = undefined;
        this._element.removeEventListener('click', this._tabClickListener);
        this._element.removeEventListener('touchstart', this._tabTouchStartListener);
        (_a = this._closeElement) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', this._closeClickListener);
        (_b = this._closeElement) === null || _b === void 0 ? void 0 : _b.removeEventListener('touchstart', this._closeTouchStartListener);
        // this._closeElement?.removeEventListener('mousedown', this._closeMouseDownListener);
        this._componentItem.off('titleChanged', this._tabTitleChangedListener);
        if (this.reorderEnabled) {
            this.disableReorder();
        }
        this._element.remove();
    }
    /** @internal */
    setBlurred() {
        this._element.classList.remove("lm_focused" /* Focused */);
        this._titleElement.classList.remove("lm_focused" /* Focused */);
    }
    /** @internal */
    setFocused() {
        this._element.classList.add("lm_focused" /* Focused */);
        this._titleElement.classList.add("lm_focused" /* Focused */);
    }
    /**
     * Callback for the DragListener
     * @param x - The tabs absolute x position
     * @param y - The tabs absolute y position
     * @internal
     */
    onDragStart(x, y) {
        if (this._dragListener === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('TODSDLU10093');
        }
        else {
            if (this._dragStartEvent === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('TODS23309');
            }
            else {
                this._dragStartEvent(x, y, this._dragListener, this.componentItem);
            }
        }
    }
    /** @internal */
    onContentItemDestroy() {
        if (this._dragListener !== undefined) {
            this._dragListener.destroy();
            this._dragListener = undefined;
        }
    }
    /**
     * Callback when the tab is clicked
     * @internal
     */
    onTabClickDown(event) {
        const target = event.target;
        if (target === this._element || target === this._titleElement) {
            // left mouse button
            if (event.button === 0) {
                // event.stopPropagation();
                this.notifyFocus();
                // middle mouse button
            }
            else if (event.button === 1 && this._componentItem.isClosable) {
                // event.stopPropagation();
                this.notifyClose();
            }
        }
    }
    /** @internal */
    onTabTouchStart(event) {
        if (event.target === this._element) {
            this.notifyFocus();
        }
    }
    /**
     * Callback when the tab's close button is clicked
     * @internal
     */
    onCloseClick() {
        this.notifyClose();
    }
    /** @internal */
    onCloseTouchStart() {
        this.notifyClose();
    }
    /**
     * Callback to capture tab close button mousedown
     * to prevent tab from activating.
     * @internal
     */
    // private onCloseMousedown(): void {
    //     // event.stopPropagation();
    // }
    /** @internal */
    notifyClose() {
        if (this._closeEvent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('TNC15007');
        }
        else {
            this._closeEvent(this._componentItem);
        }
    }
    /** @internal */
    notifyFocus() {
        if (this._focusEvent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('TNA15007');
        }
        else {
            this._focusEvent(this._componentItem);
        }
    }
    /** @internal */
    enableReorder() {
        this._dragListener = new drag_listener_1.DragListener(this._element, [this._titleElement]);
        this._dragListener.on('dragStart', this._dragStartListener);
        this._componentItem.on('destroy', this._contentItemDestroyListener);
    }
    /** @internal */
    disableReorder() {
        if (this._dragListener === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('TDR87745');
        }
        else {
            this._componentItem.off('destroy', this._contentItemDestroyListener);
            this._dragListener.off('dragStart', this._dragStartListener);
            this._dragListener = undefined;
        }
    }
}
exports.Tab = Tab;

},{"../errors/internal-error":17,"../utils/drag-listener":27}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsContainer = void 0;
const internal_error_1 = require("../errors/internal-error");
const utils_1 = require("../utils/utils");
const tab_1 = require("./tab");
/** @internal */
class TabsContainer {
    constructor(_layoutManager, _componentRemoveEvent, _componentFocusEvent, _componentDragStartEvent, _dropdownActiveChangedEvent) {
        this._layoutManager = _layoutManager;
        this._componentRemoveEvent = _componentRemoveEvent;
        this._componentFocusEvent = _componentFocusEvent;
        this._componentDragStartEvent = _componentDragStartEvent;
        this._dropdownActiveChangedEvent = _dropdownActiveChangedEvent;
        // There is one tab per ComponentItem in stack.  However they may not be ordered the same
        this._tabs = [];
        this._lastVisibleTabIndex = -1;
        this._dropdownActive = false;
        this._element = document.createElement('section');
        this._element.classList.add("lm_tabs" /* Tabs */);
        this._dropdownElement = document.createElement('section');
        this._dropdownElement.classList.add("lm_tabdropdown_list" /* TabDropdownList */);
        this._dropdownElement.style.display = 'none';
    }
    get tabs() { return this._tabs; }
    get tabCount() { return this._tabs.length; }
    get lastVisibleTabIndex() { return this._lastVisibleTabIndex; }
    get element() { return this._element; }
    get dropdownElement() { return this._dropdownElement; }
    get dropdownActive() { return this._dropdownActive; }
    destroy() {
        for (let i = 0; i < this._tabs.length; i++) {
            this._tabs[i].destroy();
        }
    }
    /**
     * Creates a new tab and associates it with a contentItem
     * @param index - The position of the tab
     */
    createTab(componentItem, index) {
        //If there's already a tab relating to the
        //content item, don't do anything
        for (let i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].componentItem === componentItem) {
                return;
            }
        }
        const tab = new tab_1.Tab(this._layoutManager, componentItem, (item) => this.handleTabCloseEvent(item), (item) => this.handleTabFocusEvent(item), (x, y, dragListener, item) => this.handleTabDragStartEvent(x, y, dragListener, item));
        if (index === undefined) {
            index = this._tabs.length;
        }
        this._tabs.splice(index, 0, tab);
        if (index < this._element.childNodes.length) {
            this._element.insertBefore(tab.element, this._element.childNodes[index]);
        }
        else {
            this._element.appendChild(tab.element);
        }
    }
    removeTab(componentItem) {
        // componentItem cannot be ActiveComponentItem
        for (let i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].componentItem === componentItem) {
                const tab = this._tabs[i];
                tab.destroy();
                this._tabs.splice(i, 1);
                return;
            }
        }
        throw new Error('contentItem is not controlled by this header');
    }
    processActiveComponentChanged(newActiveComponentItem) {
        let activeIndex = -1;
        for (let i = 0; i < this._tabs.length; i++) {
            const isActive = this._tabs[i].componentItem === newActiveComponentItem;
            this._tabs[i].setActive(isActive);
            if (isActive) {
                activeIndex = i;
            }
        }
        if (activeIndex < 0) {
            throw new internal_error_1.AssertError('HSACI56632');
        }
        else {
            if (this._layoutManager.layoutConfig.settings.reorderOnTabMenuClick) {
                /**
                 * If the tab selected was in the dropdown, move everything down one to make way for this one to be the first.
                 * This will make sure the most used tabs stay visible.
                 */
                if (this._lastVisibleTabIndex !== -1 && activeIndex > this._lastVisibleTabIndex) {
                    const activeTab = this._tabs[activeIndex];
                    for (let j = activeIndex; j > 0; j--) {
                        this._tabs[j] = this._tabs[j - 1];
                    }
                    this._tabs[0] = activeTab;
                    // updateTabSizes will always be called after this and it will reposition tab elements
                }
            }
        }
    }
    /**
     * Pushes the tabs to the tab dropdown if the available space is not sufficient
     */
    updateTabSizes(availableWidth, activeComponentItem) {
        let dropDownActive = false;
        const success = this.tryUpdateTabSizes(dropDownActive, availableWidth, activeComponentItem);
        if (!success) {
            dropDownActive = true;
            // this will always succeed
            this.tryUpdateTabSizes(dropDownActive, availableWidth, activeComponentItem);
        }
        if (dropDownActive !== this._dropdownActive) {
            this._dropdownActive = dropDownActive;
            this._dropdownActiveChangedEvent();
        }
    }
    tryUpdateTabSizes(dropdownActive, availableWidth, activeComponentItem) {
        if (this._tabs.length > 0) {
            if (activeComponentItem === undefined) {
                throw new Error('non-empty tabs must have active component item');
            }
            let cumulativeTabWidth = 0;
            let tabOverlapAllowanceExceeded = false;
            const tabOverlapAllowance = this._layoutManager.layoutConfig.settings.tabOverlapAllowance;
            const activeIndex = this._tabs.indexOf(activeComponentItem.tab);
            const activeTab = this._tabs[activeIndex];
            this._lastVisibleTabIndex = -1;
            for (let i = 0; i < this._tabs.length; i++) {
                const tabElement = this._tabs[i].element;
                //Put the tab in the tabContainer so its true width can be checked
                if (tabElement.parentElement !== this._element) {
                    this._element.appendChild(tabElement);
                }
                const tabMarginRightPixels = getComputedStyle(activeTab.element).marginRight;
                const tabMarginRight = (0, utils_1.pixelsToNumber)(tabMarginRightPixels);
                const tabWidth = tabElement.offsetWidth + tabMarginRight;
                cumulativeTabWidth += tabWidth;
                //Include the active tab's width if it isn't already
                //This is to ensure there is room to show the active tab
                let visibleTabWidth = 0;
                if (activeIndex <= i) {
                    visibleTabWidth = cumulativeTabWidth;
                }
                else {
                    const activeTabMarginRightPixels = getComputedStyle(activeTab.element).marginRight;
                    const activeTabMarginRight = (0, utils_1.pixelsToNumber)(activeTabMarginRightPixels);
                    visibleTabWidth = cumulativeTabWidth + activeTab.element.offsetWidth + activeTabMarginRight;
                }
                // If the tabs won't fit, check the overlap allowance.
                if (visibleTabWidth > availableWidth) {
                    //Once allowance is exceeded, all remaining tabs go to menu.
                    if (!tabOverlapAllowanceExceeded) {
                        //No overlap for first tab or active tab
                        //Overlap spreads among non-active, non-first tabs
                        let overlap;
                        if (activeIndex > 0 && activeIndex <= i) {
                            overlap = (visibleTabWidth - availableWidth) / (i - 1);
                        }
                        else {
                            overlap = (visibleTabWidth - availableWidth) / i;
                        }
                        //Check overlap against allowance.
                        if (overlap < tabOverlapAllowance) {
                            for (let j = 0; j <= i; j++) {
                                const marginLeft = (j !== activeIndex && j !== 0) ? '-' + (0, utils_1.numberToPixels)(overlap) : '';
                                this._tabs[j].element.style.zIndex = (0, utils_1.numberToPixels)(i - j);
                                this._tabs[j].element.style.marginLeft = marginLeft;
                            }
                            this._lastVisibleTabIndex = i;
                            if (tabElement.parentElement !== this._element) {
                                this._element.appendChild(tabElement);
                            }
                        }
                        else {
                            tabOverlapAllowanceExceeded = true;
                        }
                    }
                    else if (i === activeIndex) {
                        //Active tab should show even if allowance exceeded. (We left room.)
                        tabElement.style.zIndex = 'auto';
                        tabElement.style.marginLeft = '';
                        if (tabElement.parentElement !== this._element) {
                            this._element.appendChild(tabElement);
                        }
                    }
                    if (tabOverlapAllowanceExceeded && i !== activeIndex) {
                        if (dropdownActive) {
                            //Tab menu already shown, so we just add to it.
                            tabElement.style.zIndex = 'auto';
                            tabElement.style.marginLeft = '';
                            if (tabElement.parentElement !== this._dropdownElement) {
                                this._dropdownElement.appendChild(tabElement);
                            }
                        }
                        else {
                            //We now know the tab menu must be shown, so we have to recalculate everything.
                            return false;
                        }
                    }
                }
                else {
                    this._lastVisibleTabIndex = i;
                    tabElement.style.zIndex = 'auto';
                    tabElement.style.marginLeft = '';
                    if (tabElement.parentElement !== this._element) {
                        this._element.appendChild(tabElement);
                    }
                }
            }
        }
        return true;
    }
    /**
     * Shows drop down for additional tabs when there are too many to display.
     */
    showAdditionalTabsDropdown() {
        this._dropdownElement.style.display = '';
    }
    /**
     * Hides drop down for additional tabs when there are too many to display.
     */
    hideAdditionalTabsDropdown() {
        this._dropdownElement.style.display = 'none';
    }
    handleTabCloseEvent(componentItem) {
        this._componentRemoveEvent(componentItem);
    }
    handleTabFocusEvent(componentItem) {
        this._componentFocusEvent(componentItem);
    }
    handleTabDragStartEvent(x, y, dragListener, componentItem) {
        this._componentDragStartEvent(x, y, dragListener, componentItem);
    }
}
exports.TabsContainer = TabsContainer;

},{"../errors/internal-error":17,"../utils/utils":33,"./tab":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionIndicator = void 0;
/** @internal @deprecated To be removed */
class TransitionIndicator {
    constructor() {
        this._element = document.createElement('div');
        this._element.classList.add("lm_transition_indicator" /* TransitionIndicator */);
        document.body.appendChild(this._element);
        this._toElement = null;
        this._fromDimensions = null;
        this._totalAnimationDuration = 200;
        this._animationStartTime = null;
    }
    destroy() {
        this._element.remove();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transitionElements(fromElement, toElement) {
        /**
         * TODO - This is not quite as cool as expected. Review.
         */
        return;
        // this._toElement = toElement;
        // this._animationStartTime = now();
        // this._fromDimensions = this._measure(fromElement);
        // this._fromDimensions.opacity = 0.8;
        // this._element.show().css(this._fromDimensions);
        // animFrame(fnBind(this._nextAnimationFrame, this));
    }
    nextAnimationFrame() {
        // if (this._toElement === null || this._fromDimensions === null || this._animationStartTime === null) {
        //     throw new UnexpectedNullError('TINAFTD97115');
        // } else {
        //     const toDimensions = this.measure(this._toElement);
        //     const animationProgress = (now() - this._animationStartTime) / this._totalAnimationDuration;
        //     const currentFrameStyles = {};
        //     const cssProperty;
        //     if (animationProgress >= 1) {
        //         this._element.style.display = 'none';
        //         return;
        //     }
        //     toDimensions.opacity = 0;
        //     for (const cssProperty in this._fromDimensions) {
        //         currentFrameStyles[cssProperty] = this._fromDimensions[cssProperty] +
        //             (toDimensions[cssProperty] - this._fromDimensions[cssProperty]) *
        //             animationProgress;
        //     }
        //     this._element.css(currentFrameStyles);
        //     animFrame(fnBind(this._nextAnimationFrame, this));
        // }
    }
    measure(element) {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            width: element.offsetWidth,
            height: element.offsetHeight,
        };
    }
}
exports.TransitionIndicator = TransitionIndicator;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindError = exports.ApiError = exports.PopoutBlockedError = exports.ConfigurationError = exports.ExternalError = void 0;
/** @public */
class ExternalError extends Error {
    /** @internal */
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}
exports.ExternalError = ExternalError;
/** @public */
class ConfigurationError extends ExternalError {
    /** @internal */
    constructor(message, node) {
        super('Configuration', message);
        this.node = node;
    }
}
exports.ConfigurationError = ConfigurationError;
/** @public */
class PopoutBlockedError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('PopoutBlocked', message);
    }
}
exports.PopoutBlockedError = PopoutBlockedError;
/** @public */
class ApiError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('API', message);
    }
}
exports.ApiError = ApiError;
/** @public */
class BindError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('Bind', message);
    }
}
exports.BindError = BindError;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedUndefinedError = exports.UnexpectedNullError = exports.UnreachableCaseError = exports.AssertError = void 0;
/** @internal */
class InternalError extends Error {
    constructor(type, code, message) {
        super(`${type}: ${code}${message === undefined ? '' : ': ' + message}`);
    }
}
/** @internal */
class AssertError extends InternalError {
    constructor(code, message) {
        super('Assert', code, message);
    }
}
exports.AssertError = AssertError;
/** @internal */
class UnreachableCaseError extends InternalError {
    constructor(code, variableValue, message) {
        super('UnreachableCase', code, `${variableValue}${message === undefined ? '' : ': ' + message}`);
    }
}
exports.UnreachableCaseError = UnreachableCaseError;
/** @internal */
class UnexpectedNullError extends InternalError {
    constructor(code, message) {
        super('UnexpectedNull', code, message);
    }
}
exports.UnexpectedNullError = UnexpectedNullError;
/** @internal */
class UnexpectedUndefinedError extends InternalError {
    constructor(code, message) {
        super('UnexpectedUndefined', code, message);
    }
}
exports.UnexpectedUndefinedError = UnexpectedUndefinedError;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldenLayout = void 0;
const resolved_config_1 = require("./config/resolved-config");
const external_error_1 = require("./errors/external-error");
const internal_error_1 = require("./errors/internal-error");
const i18n_strings_1 = require("./utils/i18n-strings");
const utils_1 = require("./utils/utils");
const virtual_layout_1 = require("./virtual-layout");
/** @public */
class GoldenLayout extends virtual_layout_1.VirtualLayout {
    /** @internal */
    constructor(configOrOptionalContainer, containerOrBindComponentEventHandler, unbindComponentEventHandler) {
        super(configOrOptionalContainer, containerOrBindComponentEventHandler, unbindComponentEventHandler, true);
        /** @internal */
        this._componentTypesMap = new Map();
        /** @internal */
        this._registeredComponentMap = new Map();
        /** @internal */
        this._virtuableComponentMap = new Map();
        /** @internal */
        this._containerVirtualRectingRequiredEventListener = (container, width, height) => this.handleContainerVirtualRectingRequiredEvent(container, width, height);
        /** @internal */
        this._containerVirtualVisibilityChangeRequiredEventListener = (container, visible) => this.handleContainerVirtualVisibilityChangeRequiredEvent(container, visible);
        /** @internal */
        this._containerVirtualZIndexChangeRequiredEventListener = (container, logicalZIndex, defaultZIndex) => this.handleContainerVirtualZIndexChangeRequiredEvent(container, logicalZIndex, defaultZIndex);
        // we told VirtualLayout to not call init() (skipInit set to true) so that Golden Layout can initialise its properties before init is called
        if (!this.deprecatedConstructor) {
            this.init();
        }
    }
    /**
     * Register a new component type with the layout manager.
     *
     * @deprecated See {@link https://stackoverflow.com/questions/40922531/how-to-check-if-a-javascript-function-is-a-constructor}
     * instead use {@link (GoldenLayout:class).registerComponentConstructor}
     * or {@link (GoldenLayout:class).registerComponentFactoryFunction}
     */
    registerComponent(name, componentConstructorOrFactoryFtn, virtual = false) {
        if (typeof componentConstructorOrFactoryFtn !== 'function') {
            throw new external_error_1.ApiError('registerComponent() componentConstructorOrFactoryFtn parameter is not a function');
        }
        else {
            if (componentConstructorOrFactoryFtn.hasOwnProperty('prototype')) {
                const componentConstructor = componentConstructorOrFactoryFtn;
                this.registerComponentConstructor(name, componentConstructor, virtual);
            }
            else {
                const componentFactoryFtn = componentConstructorOrFactoryFtn;
                this.registerComponentFactoryFunction(name, componentFactoryFtn, virtual);
            }
        }
    }
    /**
     * Register a new component type with the layout manager.
     */
    registerComponentConstructor(typeName, componentConstructor, virtual = false) {
        if (typeof componentConstructor !== 'function') {
            throw new Error(i18n_strings_1.i18nStrings[1 /* PleaseRegisterAConstructorFunction */]);
        }
        const existingComponentType = this._componentTypesMap.get(typeName);
        if (existingComponentType !== undefined) {
            throw new external_error_1.BindError(`${i18n_strings_1.i18nStrings[3 /* ComponentIsAlreadyRegistered */]}: ${typeName}`);
        }
        this._componentTypesMap.set(typeName, {
            constructor: componentConstructor,
            factoryFunction: undefined,
            virtual,
        });
    }
    /**
     * Register a new component with the layout manager.
     */
    registerComponentFactoryFunction(typeName, componentFactoryFunction, virtual = false) {
        if (typeof componentFactoryFunction !== 'function') {
            throw new external_error_1.BindError('Please register a constructor function');
        }
        const existingComponentType = this._componentTypesMap.get(typeName);
        if (existingComponentType !== undefined) {
            throw new external_error_1.BindError(`${i18n_strings_1.i18nStrings[3 /* ComponentIsAlreadyRegistered */]}: ${typeName}`);
        }
        this._componentTypesMap.set(typeName, {
            constructor: undefined,
            factoryFunction: componentFactoryFunction,
            virtual,
        });
    }
    /**
     * Register a component function with the layout manager. This function should
     * return a constructor for a component based on a config.
     * This function will be called if a component type with the required name is not already registered.
     * It is recommended that applications use the {@link (VirtualLayout:class).getComponentEvent} and
     * {@link (VirtualLayout:class).releaseComponentEvent} instead of registering a constructor callback
     * @deprecated use {@link (GoldenLayout:class).registerGetComponentConstructorCallback}
     */
    registerComponentFunction(callback) {
        this.registerGetComponentConstructorCallback(callback);
    }
    /**
     * Register a callback closure with the layout manager which supplies a Component Constructor.
     * This callback should return a constructor for a component based on a config.
     * This function will be called if a component type with the required name is not already registered.
     * It is recommended that applications use the {@link (VirtualLayout:class).getComponentEvent} and
     * {@link (VirtualLayout:class).releaseComponentEvent} instead of registering a constructor callback
     */
    registerGetComponentConstructorCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Please register a callback function');
        }
        if (this._getComponentConstructorFtn !== undefined) {
            console.warn('Multiple component functions are being registered.  Only the final registered function will be used.');
        }
        this._getComponentConstructorFtn = callback;
    }
    getRegisteredComponentTypeNames() {
        const typeNamesIterableIterator = this._componentTypesMap.keys();
        return Array.from(typeNamesIterableIterator);
    }
    /**
     * Returns a previously registered component instantiator.  Attempts to utilize registered
     * component type by first, then falls back to the component constructor callback function (if registered).
     * If neither gets an instantiator, then returns `undefined`.
     * Note that `undefined` will return if config.componentType is not a string
     *
     * @param config - The item config
     * @public
     */
    getComponentInstantiator(config) {
        let instantiator;
        const typeName = resolved_config_1.ResolvedComponentItemConfig.resolveComponentTypeName(config);
        if (typeName !== undefined) {
            instantiator = this._componentTypesMap.get(typeName);
        }
        if (instantiator === undefined) {
            if (this._getComponentConstructorFtn !== undefined) {
                instantiator = {
                    constructor: this._getComponentConstructorFtn(config),
                    factoryFunction: undefined,
                    virtual: false,
                };
            }
        }
        return instantiator;
    }
    /** @internal */
    bindComponent(container, itemConfig) {
        let instantiator;
        const typeName = resolved_config_1.ResolvedComponentItemConfig.resolveComponentTypeName(itemConfig);
        if (typeName !== undefined) {
            instantiator = this._componentTypesMap.get(typeName);
        }
        if (instantiator === undefined) {
            if (this._getComponentConstructorFtn !== undefined) {
                instantiator = {
                    constructor: this._getComponentConstructorFtn(itemConfig),
                    factoryFunction: undefined,
                    virtual: false,
                };
            }
        }
        let result;
        if (instantiator !== undefined) {
            const virtual = instantiator.virtual;
            // handle case where component is obtained by name or component constructor callback
            let componentState;
            if (itemConfig.componentState === undefined) {
                componentState = undefined;
            }
            else {
                // make copy
                componentState = (0, utils_1.deepExtendValue)({}, itemConfig.componentState);
            }
            let component;
            const componentConstructor = instantiator.constructor;
            if (componentConstructor !== undefined) {
                component = new componentConstructor(container, componentState, virtual);
            }
            else {
                const factoryFunction = instantiator.factoryFunction;
                if (factoryFunction !== undefined) {
                    component = factoryFunction(container, componentState, virtual);
                }
                else {
                    throw new internal_error_1.AssertError('LMBCFFU10008');
                }
            }
            if (virtual) {
                if (component === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('GLBCVCU988774');
                }
                else {
                    const virtuableComponent = component;
                    const componentRootElement = virtuableComponent.rootHtmlElement;
                    if (componentRootElement === undefined) {
                        throw new external_error_1.BindError(`${i18n_strings_1.i18nStrings[5 /* VirtualComponentDoesNotHaveRootHtmlElement */]}: ${typeName}`);
                    }
                    else {
                        (0, utils_1.ensureElementPositionAbsolute)(componentRootElement);
                        this.container.appendChild(componentRootElement);
                        this._virtuableComponentMap.set(container, virtuableComponent);
                        container.virtualRectingRequiredEvent = this._containerVirtualRectingRequiredEventListener;
                        container.virtualVisibilityChangeRequiredEvent = this._containerVirtualVisibilityChangeRequiredEventListener;
                        container.virtualZIndexChangeRequiredEvent = this._containerVirtualZIndexChangeRequiredEventListener;
                    }
                }
            }
            this._registeredComponentMap.set(container, component);
            result = {
                virtual: instantiator.virtual,
                component,
            };
        }
        else {
            // Use getComponentEvent
            result = super.bindComponent(container, itemConfig);
        }
        return result;
    }
    /** @internal */
    unbindComponent(container, virtual, component) {
        const registeredComponent = this._registeredComponentMap.get(container);
        if (registeredComponent === undefined) {
            super.unbindComponent(container, virtual, component); // was not created from registration so use virtual unbind events
        }
        else {
            const virtuableComponent = this._virtuableComponentMap.get(container);
            if (virtuableComponent !== undefined) {
                const componentRootElement = virtuableComponent.rootHtmlElement;
                if (componentRootElement === undefined) {
                    throw new internal_error_1.AssertError('GLUC77743', container.title);
                }
                else {
                    this.container.removeChild(componentRootElement);
                    this._virtuableComponentMap.delete(container);
                }
            }
        }
    }
    fireBeforeVirtualRectingEvent(count) {
        this._goldenLayoutBoundingClientRect = this.container.getBoundingClientRect();
        super.fireBeforeVirtualRectingEvent(count);
    }
    /** @internal */
    handleContainerVirtualRectingRequiredEvent(container, width, height) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('GLHCSCE55933');
        }
        else {
            const rootElement = virtuableComponent.rootHtmlElement;
            if (rootElement === undefined) {
                throw new external_error_1.BindError(i18n_strings_1.i18nStrings[4 /* ComponentIsNotVirtuable */] + ' ' + container.title);
            }
            else {
                const containerBoundingClientRect = container.element.getBoundingClientRect();
                const left = containerBoundingClientRect.left - this._goldenLayoutBoundingClientRect.left;
                rootElement.style.left = (0, utils_1.numberToPixels)(left);
                const top = containerBoundingClientRect.top - this._goldenLayoutBoundingClientRect.top;
                rootElement.style.top = (0, utils_1.numberToPixels)(top);
                (0, utils_1.setElementWidth)(rootElement, width);
                (0, utils_1.setElementHeight)(rootElement, height);
            }
        }
    }
    /** @internal */
    handleContainerVirtualVisibilityChangeRequiredEvent(container, visible) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('GLHCVVCRE55934');
        }
        else {
            const rootElement = virtuableComponent.rootHtmlElement;
            if (rootElement === undefined) {
                throw new external_error_1.BindError(i18n_strings_1.i18nStrings[4 /* ComponentIsNotVirtuable */] + ' ' + container.title);
            }
            else {
                (0, utils_1.setElementDisplayVisibility)(rootElement, visible);
            }
        }
    }
    /** @internal */
    handleContainerVirtualZIndexChangeRequiredEvent(container, logicalZIndex, defaultZIndex) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('GLHCVZICRE55935');
        }
        else {
            const rootElement = virtuableComponent.rootHtmlElement;
            if (rootElement === undefined) {
                throw new external_error_1.BindError(i18n_strings_1.i18nStrings[4 /* ComponentIsNotVirtuable */] + ' ' + container.title);
            }
            else {
                rootElement.style.zIndex = defaultZIndex;
            }
        }
    }
}
exports.GoldenLayout = GoldenLayout;

},{"./config/resolved-config":4,"./errors/external-error":16,"./errors/internal-error":17,"./utils/i18n-strings":30,"./utils/utils":33,"./virtual-layout":34}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentItem = void 0;
const resolved_config_1 = require("../config/resolved-config");
const component_container_1 = require("../container/component-container");
const internal_error_1 = require("../errors/internal-error");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const content_item_1 = require("./content-item");
/** @public */
class ComponentItem extends content_item_1.ContentItem {
    /** @internal */
    constructor(layoutManager, config, 
    /** @internal */
    _parentItem) {
        super(layoutManager, config, _parentItem, document.createElement('div'));
        this._parentItem = _parentItem;
        /** @internal */
        this._focused = false;
        this.isComponent = true;
        this._reorderEnabled = config.reorderEnabled;
        this.applyUpdatableConfig(config);
        this._initialWantMaximise = config.maximised;
        const containerElement = document.createElement('div');
        containerElement.classList.add("lm_content" /* Content */);
        this.element.appendChild(containerElement);
        this._container = new component_container_1.ComponentContainer(config, this, layoutManager, containerElement, (itemConfig) => this.handleUpdateItemConfigEvent(itemConfig), () => this.show(), () => this.hide(), (suppressEvent) => this.focus(suppressEvent), (suppressEvent) => this.blur(suppressEvent));
    }
    /** @internal @deprecated use {@link (ComponentItem:class).componentType} */
    get componentName() { return this._container.componentType; }
    get componentType() { return this._container.componentType; }
    get reorderEnabled() { return this._reorderEnabled; }
    /** @internal */
    get initialWantMaximise() { return this._initialWantMaximise; }
    get component() { return this._container.component; }
    get container() { return this._container; }
    get parentItem() { return this._parentItem; }
    get headerConfig() { return this._headerConfig; }
    get title() { return this._title; }
    get tab() { return this._tab; }
    get focused() { return this._focused; }
    /** @internal */
    destroy() {
        this._container.destroy();
        super.destroy();
    }
    applyUpdatableConfig(config) {
        this.setTitle(config.title);
        this._headerConfig = config.header;
    }
    toConfig() {
        const stateRequestEvent = this._container.stateRequestEvent;
        const state = stateRequestEvent === undefined ? this._container.state : stateRequestEvent();
        const result = {
            type: types_1.ItemType.component,
            content: [],
            size: this.size,
            sizeUnit: this.sizeUnit,
            minSize: this.minSize,
            minSizeUnit: this.minSizeUnit,
            id: this.id,
            maximised: false,
            isClosable: this.isClosable,
            reorderEnabled: this._reorderEnabled,
            title: this._title,
            header: resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(this._headerConfig),
            componentType: resolved_config_1.ResolvedComponentItemConfig.copyComponentType(this.componentType),
            componentState: state,
        };
        return result;
    }
    close() {
        if (this.parent === null) {
            throw new internal_error_1.UnexpectedNullError('CIC68883');
        }
        else {
            this.parent.removeChild(this, false);
        }
    }
    // Used by Drag Proxy
    /** @internal */
    enterDragMode(width, height) {
        (0, utils_1.setElementWidth)(this.element, width);
        (0, utils_1.setElementHeight)(this.element, height);
        this._container.enterDragMode(width, height);
    }
    /** @internal */
    exitDragMode() {
        this._container.exitDragMode();
    }
    /** @internal */
    enterStackMaximised() {
        this._container.enterStackMaximised();
    }
    /** @internal */
    exitStackMaximised() {
        this._container.exitStackMaximised();
    }
    // Used by Drag Proxy
    /** @internal */
    drag() {
        this._container.drag();
    }
    /** @internal */
    updateSize(force) {
        this.updateNodeSize(force);
    }
    /** @internal */
    init() {
        this.updateNodeSize(false);
        super.init();
        this._container.emit('open');
        this.initContentItems();
    }
    /**
     * Set this component's title
     *
     * @public
     * @param title -
     */
    setTitle(title) {
        this._title = title;
        this.emit('titleChanged', title);
        this.emit('stateChanged');
    }
    setTab(tab) {
        this._tab = tab;
        this.emit('tab', tab);
        this._container.setTab(tab);
    }
    /** @internal */
    hide() {
        super.hide();
        this._container.setVisibility(false);
    }
    /** @internal */
    show() {
        super.show();
        this._container.setVisibility(true);
    }
    /**
     * Focuses the item if it is not already focused
     */
    focus(suppressEvent = false) {
        this.parentItem.setActiveComponentItem(this, true, suppressEvent);
    }
    /** @internal */
    setFocused(suppressEvent) {
        this._focused = true;
        this.tab.setFocused();
        if (!suppressEvent) {
            this.emitBaseBubblingEvent('focus');
        }
    }
    /**
     * Blurs (defocuses) the item if it is focused
     */
    blur(suppressEvent = false) {
        if (this._focused) {
            this.layoutManager.setFocusedComponentItem(undefined, suppressEvent);
        }
    }
    /** @internal */
    setBlurred(suppressEvent) {
        this._focused = false;
        this.tab.setBlurred();
        if (!suppressEvent) {
            this.emitBaseBubblingEvent('blur');
        }
    }
    /** @internal */
    setParent(parent) {
        this._parentItem = parent;
        super.setParent(parent);
    }
    /** @internal */
    handleUpdateItemConfigEvent(itemConfig) {
        this.applyUpdatableConfig(itemConfig);
    }
    /** @internal */
    updateNodeSize(force) {
        if (this.element.style.display !== 'none') {
            // Do not update size of hidden components to prevent unwanted reflows
            const { width, height } = (0, utils_1.getElementWidthAndHeight)(this.element);
            this._container.setSizeToNodeSize(width, height, force);
        }
    }
}
exports.ComponentItem = ComponentItem;

},{"../config/resolved-config":4,"../container/component-container":5,"../errors/internal-error":17,"../utils/types":32,"../utils/utils":33,"./content-item":21}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentParentableItem = void 0;
const content_item_1 = require("./content-item");
class ComponentParentableItem extends content_item_1.ContentItem {
    constructor() {
        super(...arguments);
        /** @internal */
        this._focused = false;
    }
    get focused() { return this._focused; }
    /** @internal */
    setFocusedValue(value) {
        this._focused = value;
    }
}
exports.ComponentParentableItem = ComponentParentableItem;

},{"./content-item":21}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentItem = void 0;
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("../utils/event-emitter");
const utils_1 = require("../utils/utils");
/**
 * This is the baseclass that all content items inherit from.
 * Most methods provide a subset of what the sub-classes do.
 *
 * It also provides a number of functions for tree traversal
 * @public
 */
class ContentItem extends event_emitter_1.EventEmitter {
    /** @internal */
    constructor(layoutManager, config, 
    /** @internal */
    _parent, 
    /** @internal */
    _element) {
        super();
        this.layoutManager = layoutManager;
        this._parent = _parent;
        this._element = _element;
        /** @internal */
        this._popInParentIds = [];
        this._type = config.type;
        this._id = config.id;
        this._isInitialised = false;
        this.isGround = false;
        this.isRow = false;
        this.isColumn = false;
        this.isStack = false;
        this.isComponent = false;
        this.size = config.size;
        this.sizeUnit = config.sizeUnit;
        this.minSize = config.minSize;
        this.minSizeUnit = config.minSizeUnit;
        this._isClosable = config.isClosable;
        this._pendingEventPropagations = {};
        this._throttledEvents = ['stateChanged'];
        this._contentItems = this.createContentItems(config.content);
    }
    get type() { return this._type; }
    get id() { return this._id; }
    set id(value) { this._id = value; }
    /** @internal */
    get popInParentIds() { return this._popInParentIds; }
    get parent() { return this._parent; }
    get contentItems() { return this._contentItems; }
    get isClosable() { return this._isClosable; }
    get element() { return this._element; }
    get isInitialised() { return this._isInitialised; }
    static isStack(item) {
        return item.isStack;
    }
    static isComponentItem(item) {
        return item.isComponent;
    }
    static isComponentParentableItem(item) {
        return item.isStack || item.isGround;
    }
    /**
     * Removes a child node (and its children) from the tree
     * @param contentItem - The child item to remove
     * @param keepChild - Whether to destroy the removed item
     */
    removeChild(contentItem, keepChild = false) {
        /*
         * Get the position of the item that's to be removed within all content items this node contains
         */
        const index = this._contentItems.indexOf(contentItem);
        /*
         * Make sure the content item to be removed is actually a child of this item
         */
        if (index === -1) {
            throw new Error('Can\'t remove child item. Unknown content item');
        }
        /**
         * Call destroy on the content item.
         * All children are destroyed as well
         */
        if (!keepChild) {
            this._contentItems[index].destroy();
        }
        /**
         * Remove the content item from this nodes array of children
         */
        this._contentItems.splice(index, 1);
        /**
         * If this node still contains other content items, adjust their size
         */
        if (this._contentItems.length > 0) {
            this.updateSize(false);
        }
        else {
            /**
             * If this was the last content item, remove this node as well
             */
            if (!this.isGround && this._isClosable === true) {
                if (this._parent === null) {
                    throw new internal_error_1.UnexpectedNullError('CIUC00874');
                }
                else {
                    this._parent.removeChild(this);
                }
            }
        }
    }
    /**
     * Sets up the tree structure for the newly added child
     * The responsibility for the actual DOM manipulations lies
     * with the concrete item
     *
     * @param contentItem -
     * @param index - If omitted item will be appended
     * @param suspendResize - Used by descendent implementations
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addChild(contentItem, index, suspendResize) {
        index !== null && index !== void 0 ? index : (index = this._contentItems.length);
        this._contentItems.splice(index, 0, contentItem);
        contentItem.setParent(this);
        if (this._isInitialised === true && contentItem._isInitialised === false) {
            contentItem.init();
        }
        return index;
    }
    /**
     * Replaces oldChild with newChild
     * @param oldChild -
     * @param newChild -
     * @internal
     */
    replaceChild(oldChild, newChild, destroyOldChild = false) {
        // Do not try to replace ComponentItem - will not work
        const index = this._contentItems.indexOf(oldChild);
        const parentNode = oldChild._element.parentNode;
        if (index === -1) {
            throw new internal_error_1.AssertError('CIRCI23232', 'Can\'t replace child. oldChild is not child of this');
        }
        if (parentNode === null) {
            throw new internal_error_1.UnexpectedNullError('CIRCP23232');
        }
        else {
            parentNode.replaceChild(newChild._element, oldChild._element);
            /*
            * Optionally destroy the old content item
            */
            if (destroyOldChild === true) {
                oldChild._parent = null;
                oldChild.destroy(); // will now also destroy all children of oldChild
            }
            /*
            * Wire the new contentItem into the tree
            */
            this._contentItems[index] = newChild;
            newChild.setParent(this);
            // newChild inherits the sizes from the old child:
            newChild.size = oldChild.size;
            newChild.sizeUnit = oldChild.sizeUnit;
            newChild.minSize = oldChild.minSize;
            newChild.minSizeUnit = oldChild.minSizeUnit;
            //TODO This doesn't update the config... refactor to leave item nodes untouched after creation
            if (newChild._parent === null) {
                throw new internal_error_1.UnexpectedNullError('CIRCNC45699');
            }
            else {
                if (newChild._parent._isInitialised === true && newChild._isInitialised === false) {
                    newChild.init();
                }
                this.updateSize(false);
            }
        }
    }
    /**
     * Convenience method.
     * Shorthand for this.parent.removeChild( this )
     */
    remove() {
        if (this._parent === null) {
            throw new internal_error_1.UnexpectedNullError('CIR11110');
        }
        else {
            this._parent.removeChild(this);
        }
    }
    /**
     * Removes the component from the layout and creates a new
     * browser window with the component and its children inside
     */
    popout() {
        const parentId = (0, utils_1.getUniqueId)();
        const browserPopout = this.layoutManager.createPopoutFromContentItem(this, undefined, parentId, undefined);
        this.emitBaseBubblingEvent('stateChanged');
        return browserPopout;
    }
    /** @internal */
    calculateConfigContent() {
        const contentItems = this._contentItems;
        const count = contentItems.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const item = contentItems[i];
            result[i] = item.toConfig();
        }
        return result;
    }
    /** @internal */
    highlightDropZone(x, y, area) {
        const dropTargetIndicator = this.layoutManager.dropTargetIndicator;
        if (dropTargetIndicator === null) {
            throw new internal_error_1.UnexpectedNullError('ACIHDZ5593');
        }
        else {
            dropTargetIndicator.highlightArea(area, 1);
        }
    }
    /** @internal */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDrop(contentItem, area) {
        this.addChild(contentItem);
    }
    /** @internal */
    show() {
        this.layoutManager.beginSizeInvalidation();
        try {
            // Not sure why showAllActiveContentItems() was called. GoldenLayout seems to work fine without it.  Left commented code
            // in source in case a reason for it becomes apparent.
            // this.layoutManager.showAllActiveContentItems();
            (0, utils_1.setElementDisplayVisibility)(this._element, true);
            // this.layoutManager.updateSizeFromContainer();
            for (let i = 0; i < this._contentItems.length; i++) {
                this._contentItems[i].show();
            }
        }
        finally {
            this.layoutManager.endSizeInvalidation();
        }
    }
    /**
     * Destroys this item ands its children
     * @internal
     */
    destroy() {
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].destroy();
        }
        this._contentItems = [];
        this.emitBaseBubblingEvent('beforeItemDestroyed');
        this._element.remove();
        this.emitBaseBubblingEvent('itemDestroyed');
    }
    /**
     * Returns the area the component currently occupies
     * @internal
     */
    getElementArea(element) {
        element = element !== null && element !== void 0 ? element : this._element;
        const rect = element.getBoundingClientRect();
        const top = rect.top + document.body.scrollTop;
        const left = rect.left + document.body.scrollLeft;
        const width = rect.width;
        const height = rect.height;
        return {
            x1: left,
            y1: top,
            x2: left + width,
            y2: top + height,
            surface: width * height,
            contentItem: this
        };
    }
    /**
     * The tree of content items is created in two steps: First all content items are instantiated,
     * then init is called recursively from top to bottem. This is the basic init function,
     * it can be used, extended or overwritten by the content items
     *
     * Its behaviour depends on the content item
     * @internal
     */
    init() {
        this._isInitialised = true;
        this.emitBaseBubblingEvent('itemCreated');
        this.emitUnknownBubblingEvent(this.type + 'Created');
    }
    /** @internal */
    setParent(parent) {
        this._parent = parent;
    }
    /** @internal */
    addPopInParentId(id) {
        if (!this.popInParentIds.includes(id)) {
            this.popInParentIds.push(id);
        }
    }
    /** @internal */
    initContentItems() {
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].init();
        }
    }
    /** @internal */
    hide() {
        this.layoutManager.beginSizeInvalidation();
        try {
            (0, utils_1.setElementDisplayVisibility)(this._element, false);
            // this.layoutManager.updateSizeFromContainer();
        }
        finally {
            this.layoutManager.endSizeInvalidation();
        }
    }
    /** @internal */
    updateContentItemsSize(force) {
        for (let i = 0; i < this._contentItems.length; i++) {
            this._contentItems[i].updateSize(force);
        }
    }
    /**
     * creates all content items for this node at initialisation time
     * PLEASE NOTE, please see addChild for adding contentItems at runtime
     * @internal
     */
    createContentItems(content) {
        const count = content.length;
        const result = new Array(count);
        for (let i = 0; i < content.length; i++) {
            result[i] = this.layoutManager.createContentItem(content[i], this);
        }
        return result;
    }
    /**
     * Called for every event on the item tree. Decides whether the event is a bubbling
     * event and propagates it to its parent
     *
     * @param name - The name of the event
     * @param event -
     * @internal
     */
    propagateEvent(name, args) {
        if (args.length === 1) {
            const event = args[0];
            if (event instanceof event_emitter_1.EventEmitter.BubblingEvent &&
                event.isPropagationStopped === false &&
                this._isInitialised === true) {
                /**
                 * In some cases (e.g. if an element is created from a DragSource) it
                 * doesn't have a parent and is not a child of GroundItem. If that's the case
                 * propagate the bubbling event from the top level of the substree directly
                 * to the layoutManager
                 */
                if (this.isGround === false && this._parent) {
                    this._parent.emitUnknown(name, event);
                }
                else {
                    this.scheduleEventPropagationToLayoutManager(name, event);
                }
            }
        }
    }
    tryBubbleEvent(name, args) {
        if (args.length === 1) {
            const event = args[0];
            if (event instanceof event_emitter_1.EventEmitter.BubblingEvent &&
                event.isPropagationStopped === false &&
                this._isInitialised === true) {
                /**
                 * In some cases (e.g. if an element is created from a DragSource) it
                 * doesn't have a parent and is not a child of GroundItem. If that's the case
                 * propagate the bubbling event from the top level of the substree directly
                 * to the layoutManager
                 */
                if (this.isGround === false && this._parent) {
                    this._parent.emitUnknown(name, event);
                }
                else {
                    this.scheduleEventPropagationToLayoutManager(name, event);
                }
            }
        }
    }
    /**
     * All raw events bubble up to the Ground element. Some events that
     * are propagated to - and emitted by - the layoutManager however are
     * only string-based, batched and sanitized to make them more usable
     *
     * @param name - The name of the event
     * @internal
     */
    scheduleEventPropagationToLayoutManager(name, event) {
        if (this._throttledEvents.indexOf(name) === -1) {
            this.layoutManager.emitUnknown(name, event);
        }
        else {
            if (this._pendingEventPropagations[name] !== true) {
                this._pendingEventPropagations[name] = true;
                globalThis.requestAnimationFrame(() => this.propagateEventToLayoutManager(name, event));
            }
        }
    }
    /**
     * Callback for events scheduled by _scheduleEventPropagationToLayoutManager
     *
     * @param name - The name of the event
     * @internal
     */
    propagateEventToLayoutManager(name, event) {
        this._pendingEventPropagations[name] = false;
        this.layoutManager.emitUnknown(name, event);
    }
}
exports.ContentItem = ContentItem;

},{"../errors/internal-error":17,"../utils/event-emitter":28,"../utils/utils":33}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroundItem = void 0;
const config_1 = require("../config/config");
const resolved_config_1 = require("../config/resolved-config");
const internal_error_1 = require("../errors/internal-error");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const component_item_1 = require("./component-item");
const component_parentable_item_1 = require("./component-parentable-item");
const content_item_1 = require("./content-item");
const row_or_column_1 = require("./row-or-column");
/**
 * GroundItem is the ContentItem whose one child is the root ContentItem (Root is planted in Ground).
 * (Previously it was called root however this was incorrect as its child is the root item)
 * There is only one instance of GroundItem and it is automatically created by the Layout Manager
 * @internal
 */
class GroundItem extends component_parentable_item_1.ComponentParentableItem {
    constructor(layoutManager, rootItemConfig, containerElement) {
        super(layoutManager, resolved_config_1.ResolvedGroundItemConfig.create(rootItemConfig), null, GroundItem.createElement(document));
        this.isGround = true;
        this._childElementContainer = this.element;
        this._containerElement = containerElement;
        // insert before any pre-existing content elements
        let before = null;
        while (true) {
            const prev = before ? before.previousSibling : this._containerElement.lastChild;
            if (prev instanceof Element
                && prev.classList.contains("lm_content" /* Content */)) {
                before = prev;
            }
            else {
                break;
            }
        }
        this._containerElement.insertBefore(this.element, before);
    }
    init() {
        if (this.isInitialised === true)
            return;
        this.updateNodeSize();
        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }
        super.init();
        this.initContentItems();
    }
    /**
     * Loads a new Layout
     * Internal only.  To load a new layout with API, use {@link (LayoutManager:class).loadLayout}
     */
    loadRoot(rootItemConfig) {
        // Remove existing root if it exists
        this.clearRoot();
        if (rootItemConfig !== undefined) {
            const rootContentItem = this.layoutManager.createAndInitContentItem(rootItemConfig, this);
            this.addChild(rootContentItem, 0);
        }
    }
    clearRoot() {
        // Remove existing root if it exists
        const contentItems = this.contentItems;
        switch (contentItems.length) {
            case 0: {
                return;
            }
            case 1: {
                const existingRootContentItem = contentItems[0];
                existingRootContentItem.remove();
                return;
            }
            default: {
                throw new internal_error_1.AssertError('GILR07721');
            }
        }
    }
    /**
     * Adds a ContentItem child to root ContentItem.
     * Internal only.  To load a add with API, use {@link (LayoutManager:class).addItem}
     * @returns -1 if added as root otherwise index in root ContentItem's content
     */
    addItem(itemConfig, index) {
        this.layoutManager.checkMinimiseMaximisedStack();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig, false);
        let parent;
        if (this.contentItems.length > 0) {
            parent = this.contentItems[0];
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            parent = this;
        }
        if (parent.isComponent) {
            throw new Error('Cannot add item as child to ComponentItem');
        }
        else {
            const contentItem = this.layoutManager.createAndInitContentItem(resolvedItemConfig, parent);
            index = parent.addChild(contentItem, index);
            return (parent === this) ? -1 : index;
        }
    }
    loadComponentAsRoot(itemConfig) {
        // Remove existing root if it exists
        this.clearRoot();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig, false);
        if (resolvedItemConfig.maximised) {
            throw new Error('Root Component cannot be maximised');
        }
        else {
            const rootContentItem = new component_item_1.ComponentItem(this.layoutManager, resolvedItemConfig, this);
            rootContentItem.init();
            this.addChild(rootContentItem, 0);
        }
    }
    /**
     * Adds a Root ContentItem.
     * Internal only.  To replace Root ContentItem with API, use {@link (LayoutManager:class).loadLayout}
     */
    addChild(contentItem, index) {
        if (this.contentItems.length > 0) {
            throw new Error('Ground node can only have a single child');
        }
        else {
            // contentItem = this.layoutManager._$normalizeContentItem(contentItem, this);
            this._childElementContainer.appendChild(contentItem.element);
            index = super.addChild(contentItem, index);
            this.updateSize(false);
            this.emitBaseBubblingEvent('stateChanged');
            return index;
        }
    }
    /** @internal */
    calculateConfigContent() {
        const contentItems = this.contentItems;
        const count = contentItems.length;
        const result = new Array(count);
        for (let i = 0; i < count; i++) {
            const item = contentItems[i];
            const itemConfig = item.toConfig();
            if (resolved_config_1.ResolvedRootItemConfig.isRootItemConfig(itemConfig)) {
                result[i] = itemConfig;
            }
            else {
                throw new internal_error_1.AssertError('RCCC66832');
            }
        }
        return result;
    }
    /** @internal */
    setSize(width, height) {
        if (width === undefined || height === undefined) {
            this.updateSize(false); // For backwards compatibility with v1.x API
        }
        else {
            (0, utils_1.setElementWidth)(this.element, width);
            (0, utils_1.setElementHeight)(this.element, height);
            // GroundItem can be empty
            if (this.contentItems.length > 0) {
                (0, utils_1.setElementWidth)(this.contentItems[0].element, width);
                (0, utils_1.setElementHeight)(this.contentItems[0].element, height);
            }
            this.updateContentItemsSize(false);
        }
    }
    /**
     * Adds a Root ContentItem.
     * Internal only.  To replace Root ContentItem with API, use {@link (LayoutManager:class).updateRootSize}
     */
    updateSize(force) {
        this.layoutManager.beginVirtualSizedContainerAdding();
        try {
            this.updateNodeSize();
            this.updateContentItemsSize(force);
        }
        finally {
            this.layoutManager.endVirtualSizedContainerAdding();
        }
    }
    createSideAreas() {
        const areaSize = 50;
        const oppositeSides = GroundItem.Area.oppositeSides;
        const result = new Array(Object.keys(oppositeSides).length);
        let idx = 0;
        for (const key in oppositeSides) {
            const side = key;
            const area = this.getElementArea();
            if (area === null) {
                throw new internal_error_1.UnexpectedNullError('RCSA77553');
            }
            else {
                area.side = side;
                if (oppositeSides[side][1] === '2')
                    area[side] = area[oppositeSides[side]] - areaSize;
                else
                    area[side] = area[oppositeSides[side]] + areaSize;
                area.surface = (area.x2 - area.x1) * (area.y2 - area.y1);
                result[idx++] = area;
            }
        }
        return result;
    }
    highlightDropZone(x, y, area) {
        this.layoutManager.tabDropPlaceholder.remove();
        super.highlightDropZone(x, y, area);
    }
    onDrop(contentItem, area) {
        if (contentItem.isComponent) {
            const itemConfig = resolved_config_1.ResolvedStackItemConfig.createDefault();
            // since ResolvedItemConfig.contentItems not set up, we need to add header from Component
            const component = contentItem;
            itemConfig.header = resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(component.headerConfig);
            const stack = this.layoutManager.createAndInitContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }
        if (this.contentItems.length === 0) {
            this.addChild(contentItem);
        }
        else {
            /*
             * If the contentItem that's being dropped is not dropped on a Stack (cases which just passed above and
             * which would wrap the contentItem in a Stack) we need to check whether contentItem is a RowOrColumn.
             * If it is, we need to re-wrap it in a Stack like it was when it was dragged by its Tab (it was dragged!).
             */
            if (contentItem.type === types_1.ItemType.row || contentItem.type === types_1.ItemType.column) {
                const itemConfig = resolved_config_1.ResolvedStackItemConfig.createDefault();
                const stack = this.layoutManager.createContentItem(itemConfig, this);
                stack.addChild(contentItem);
                contentItem = stack;
            }
            const type = area.side[0] == 'x' ? types_1.ItemType.row : types_1.ItemType.column;
            const insertBefore = area.side[1] == '2';
            const column = this.contentItems[0];
            if (!(column instanceof row_or_column_1.RowOrColumn) || column.type !== type) {
                const itemConfig = resolved_config_1.ResolvedItemConfig.createDefault(type);
                const rowOrColumn = this.layoutManager.createContentItem(itemConfig, this);
                this.replaceChild(column, rowOrColumn);
                rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
                rowOrColumn.addChild(column, insertBefore ? undefined : 0, true);
                column.size = 50;
                contentItem.size = 50;
                contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
                rowOrColumn.updateSize(false);
            }
            else {
                const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1];
                column.addChild(contentItem, insertBefore ? 0 : undefined, true);
                sibling.size *= 0.5;
                contentItem.size = sibling.size;
                contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
                column.updateSize(false);
            }
        }
    }
    // No ContentItem can dock with groundItem.  However Stack can have a GroundItem parent and Stack requires that
    // its parent implement dock() function.  Accordingly this function is implemented but throws an exception as it should
    // never be called
    dock() {
        throw new internal_error_1.AssertError('GID87731');
    }
    // No ContentItem can dock with groundItem.  However Stack can have a GroundItem parent and Stack requires that
    // its parent implement validateDocking() function.  Accordingly this function is implemented but throws an exception as it should
    // never be called
    validateDocking() {
        throw new internal_error_1.AssertError('GIVD87732');
    }
    getAllContentItems() {
        const result = [this];
        this.deepGetAllContentItems(this.contentItems, result);
        return result;
    }
    getConfigMaximisedItems() {
        const result = [];
        this.deepFilterContentItems(this.contentItems, result, (item) => {
            if (content_item_1.ContentItem.isStack(item) && item.initialWantMaximise) {
                return true;
            }
            else {
                if (content_item_1.ContentItem.isComponentItem(item) && item.initialWantMaximise) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        return result;
    }
    getItemsByPopInParentId(popInParentId) {
        const result = [];
        this.deepFilterContentItems(this.contentItems, result, (item) => item.popInParentIds.includes(popInParentId));
        return result;
    }
    toConfig() {
        throw new Error('Cannot generate GroundItem config');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setActiveComponentItem(item, focus, suppressFocusEvent) {
        // only applicable if ComponentItem is root and then it always has focus
    }
    updateNodeSize() {
        const { width, height } = (0, utils_1.getElementWidthAndHeight)(this._containerElement);
        (0, utils_1.setElementWidth)(this.element, width);
        (0, utils_1.setElementHeight)(this.element, height);
        /*
         * GroundItem can be empty
         */
        if (this.contentItems.length > 0) {
            (0, utils_1.setElementWidth)(this.contentItems[0].element, width);
            (0, utils_1.setElementHeight)(this.contentItems[0].element, height);
        }
    }
    deepGetAllContentItems(content, result) {
        for (let i = 0; i < content.length; i++) {
            const contentItem = content[i];
            result.push(contentItem);
            this.deepGetAllContentItems(contentItem.contentItems, result);
        }
    }
    deepFilterContentItems(content, result, checkAcceptFtn) {
        for (let i = 0; i < content.length; i++) {
            const contentItem = content[i];
            if (checkAcceptFtn(contentItem)) {
                result.push(contentItem);
            }
            this.deepFilterContentItems(contentItem.contentItems, result, checkAcceptFtn);
        }
    }
}
exports.GroundItem = GroundItem;
/** @internal */
(function (GroundItem) {
    let Area;
    (function (Area) {
        Area.oppositeSides = {
            y2: 'y1',
            x2: 'x1',
            y1: 'y2',
            x1: 'x2',
        };
    })(Area = GroundItem.Area || (GroundItem.Area = {}));
    function createElement(document) {
        const element = document.createElement('div');
        element.classList.add("lm_goldenlayout" /* GoldenLayout */);
        element.classList.add("lm_item" /* Item */);
        element.classList.add("lm_root" /* Root */);
        return element;
    }
    GroundItem.createElement = createElement;
})(GroundItem = exports.GroundItem || (exports.GroundItem = {}));

},{"../config/config":3,"../config/resolved-config":4,"../errors/internal-error":17,"../utils/types":32,"../utils/utils":33,"./component-item":19,"./component-parentable-item":20,"./content-item":21,"./row-or-column":23}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowOrColumn = void 0;
const config_1 = require("../config/config");
const splitter_1 = require("../controls/splitter");
const internal_error_1 = require("../errors/internal-error");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const content_item_1 = require("./content-item");
/** @public */
class RowOrColumn extends content_item_1.ContentItem {
    /** @internal */
    constructor(isColumn, layoutManager, config, 
    /** @internal */
    _rowOrColumnParent) {
        super(layoutManager, config, _rowOrColumnParent, RowOrColumn.createElement(document, isColumn));
        this._rowOrColumnParent = _rowOrColumnParent;
        /** @internal */
        this._splitter = [];
        this.isRow = !isColumn;
        this.isColumn = isColumn;
        this._childElementContainer = this.element;
        this._splitterSize = layoutManager.layoutConfig.dimensions.borderWidth;
        this._splitterGrabSize = layoutManager.layoutConfig.dimensions.borderGrabWidth;
        this._isColumn = isColumn;
        this._dimension = isColumn ? 'height' : 'width';
        this._splitterPosition = null;
        this._splitterMinPosition = null;
        this._splitterMaxPosition = null;
        switch (config.type) {
            case types_1.ItemType.row:
            case types_1.ItemType.column:
                this._configType = config.type;
                break;
            default:
                throw new internal_error_1.AssertError('ROCCCT00925');
        }
    }
    newComponent(componentType, componentState, title, index) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.newItem(itemConfig, index);
    }
    addComponent(componentType, componentState, title, index) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.addItem(itemConfig, index);
    }
    newItem(itemConfig, index) {
        index = this.addItem(itemConfig, index);
        const createdItem = this.contentItems[index];
        if (content_item_1.ContentItem.isStack(createdItem) && (config_1.ItemConfig.isComponent(itemConfig))) {
            // createdItem is a Stack which was created to hold wanted component.  Return component
            return createdItem.contentItems[0];
        }
        else {
            return createdItem;
        }
    }
    addItem(itemConfig, index) {
        this.layoutManager.checkMinimiseMaximisedStack();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig, false);
        const contentItem = this.layoutManager.createAndInitContentItem(resolvedItemConfig, this);
        return this.addChild(contentItem, index, false);
    }
    /**
     * Add a new contentItem to the Row or Column
     *
     * @param contentItem -
     * @param index - The position of the new item within the Row or Column.
     *                If no index is provided the item will be added to the end
     * @param suspendResize - If true the items won't be resized. This will leave the item in
     *                        an inconsistent state and is only intended to be used if multiple
     *                        children need to be added in one go and resize is called afterwards
     *
     * @returns
     */
    addChild(contentItem, index, suspendResize) {
        // contentItem = this.layoutManager._$normalizeContentItem(contentItem, this);
        if (index === undefined) {
            index = this.contentItems.length;
        }
        if (this.contentItems.length > 0) {
            const splitterElement = this.createSplitter(Math.max(0, index - 1)).element;
            if (index > 0) {
                this.contentItems[index - 1].element.insertAdjacentElement('afterend', splitterElement);
                splitterElement.insertAdjacentElement('afterend', contentItem.element);
            }
            else {
                this.contentItems[0].element.insertAdjacentElement('beforebegin', splitterElement);
                splitterElement.insertAdjacentElement('beforebegin', contentItem.element);
            }
        }
        else {
            this._childElementContainer.appendChild(contentItem.element);
        }
        super.addChild(contentItem, index);
        const newItemSize = (1 / this.contentItems.length) * 100;
        if (suspendResize === true) {
            this.emitBaseBubblingEvent('stateChanged');
            return index;
        }
        for (let i = 0; i < this.contentItems.length; i++) {
            const indexedContentItem = this.contentItems[i];
            if (indexedContentItem === contentItem) {
                contentItem.size = newItemSize;
            }
            else {
                const itemSize = indexedContentItem.size *= (100 - newItemSize) / 100;
                indexedContentItem.size = itemSize;
            }
        }
        this.updateSize(false);
        this.emitBaseBubblingEvent('stateChanged');
        return index;
    }
    /**
     * Removes a child of this element
     *
     * @param contentItem -
     * @param keepChild - If true the child will be removed, but not destroyed
     *
     */
    removeChild(contentItem, keepChild) {
        const index = this.contentItems.indexOf(contentItem);
        const splitterIndex = Math.max(index - 1, 0);
        if (index === -1) {
            throw new Error('Can\'t remove child. ContentItem is not child of this Row or Column');
        }
        /**
         * Remove the splitter before the item or after if the item happens
         * to be the first in the row/column
         */
        if (this._splitter[splitterIndex]) {
            this._splitter[splitterIndex].destroy();
            this._splitter.splice(splitterIndex, 1);
        }
        super.removeChild(contentItem, keepChild);
        if (this.contentItems.length === 1 && this.isClosable === true) {
            const childItem = this.contentItems[0];
            this.contentItems.length = 0;
            this._rowOrColumnParent.replaceChild(this, childItem, true);
        }
        else {
            this.updateSize(false);
            this.emitBaseBubblingEvent('stateChanged');
        }
    }
    /**
     * Replaces a child of this Row or Column with another contentItem
     */
    replaceChild(oldChild, newChild) {
        const size = oldChild.size;
        super.replaceChild(oldChild, newChild);
        newChild.size = size;
        this.updateSize(false);
        this.emitBaseBubblingEvent('stateChanged');
    }
    /**
     * Called whenever the dimensions of this item or one of its parents change
     */
    updateSize(force) {
        this.layoutManager.beginVirtualSizedContainerAdding();
        try {
            this.updateNodeSize();
            this.updateContentItemsSize(force);
        }
        finally {
            this.layoutManager.endVirtualSizedContainerAdding();
        }
    }
    /**
     * Invoked recursively by the layout manager. ContentItem.init appends
     * the contentItem's DOM elements to the container, RowOrColumn init adds splitters
     * in between them
     * @internal
     */
    init() {
        if (this.isInitialised === true)
            return;
        this.updateNodeSize();
        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }
        super.init();
        for (let i = 0; i < this.contentItems.length - 1; i++) {
            this.contentItems[i].element.insertAdjacentElement('afterend', this.createSplitter(i).element);
        }
        this.initContentItems();
    }
    toConfig() {
        const result = {
            type: this.type,
            content: this.calculateConfigContent(),
            size: this.size,
            sizeUnit: this.sizeUnit,
            minSize: this.minSize,
            minSizeUnit: this.minSizeUnit,
            id: this.id,
            isClosable: this.isClosable,
        };
        return result;
    }
    /** @internal */
    setParent(parent) {
        this._rowOrColumnParent = parent;
        super.setParent(parent);
    }
    /** @internal */
    updateNodeSize() {
        if (this.contentItems.length > 0) {
            this.calculateRelativeSizes();
            this.setAbsoluteSizes();
        }
        this.emitBaseBubblingEvent('stateChanged');
        this.emit('resize');
    }
    /**
     * Turns the relative sizes calculated by calculateRelativeSizes into
     * absolute pixel values and applies them to the children's DOM elements
     *
     * Assigns additional pixels to counteract Math.floor
     * @internal
     */
    setAbsoluteSizes() {
        const absoluteSizes = this.calculateAbsoluteSizes();
        for (let i = 0; i < this.contentItems.length; i++) {
            if (absoluteSizes.additionalPixel - i > 0) {
                absoluteSizes.itemSizes[i]++;
            }
            if (this._isColumn) {
                (0, utils_1.setElementWidth)(this.contentItems[i].element, absoluteSizes.crossAxisSize);
                (0, utils_1.setElementHeight)(this.contentItems[i].element, absoluteSizes.itemSizes[i]);
            }
            else {
                (0, utils_1.setElementWidth)(this.contentItems[i].element, absoluteSizes.itemSizes[i]);
                (0, utils_1.setElementHeight)(this.contentItems[i].element, absoluteSizes.crossAxisSize);
            }
        }
    }
    /**
     * Calculates the absolute sizes of all of the children of this Item.
     * @returns Set with absolute sizes and additional pixels.
     * @internal
     */
    calculateAbsoluteSizes() {
        const totalSplitterSize = (this.contentItems.length - 1) * this._splitterSize;
        const { width: elementWidth, height: elementHeight } = (0, utils_1.getElementWidthAndHeight)(this.element);
        let totalSize;
        let crossAxisSize;
        if (this._isColumn) {
            totalSize = elementHeight - totalSplitterSize;
            crossAxisSize = elementWidth;
        }
        else {
            totalSize = elementWidth - totalSplitterSize;
            crossAxisSize = elementHeight;
        }
        let totalAssigned = 0;
        const itemSizes = [];
        for (let i = 0; i < this.contentItems.length; i++) {
            const contentItem = this.contentItems[i];
            let itemSize;
            if (contentItem.sizeUnit === types_1.SizeUnitEnum.Percent) {
                itemSize = Math.floor(totalSize * (contentItem.size / 100));
            }
            else {
                throw new internal_error_1.AssertError('ROCCAS6692');
            }
            totalAssigned += itemSize;
            itemSizes.push(itemSize);
        }
        const additionalPixel = Math.floor(totalSize - totalAssigned);
        return {
            itemSizes,
            additionalPixel,
            totalSize,
            crossAxisSize,
        };
    }
    /**
     * Calculates the relative sizes of all children of this Item. The logic
     * is as follows:
     *
     * - Add up the total size of all items that have a configured size
     *
     * - If the total == 100 (check for floating point errors)
     *        Excellent, job done
     *
     * - If the total is \> 100,
     *        set the size of items without set dimensions to 1/3 and add this to the total
     *        set the size off all items so that the total is hundred relative to their original size
     *
     * - If the total is \< 100
     *        If there are items without set dimensions, distribute the remainder to 100 evenly between them
     *        If there are no items without set dimensions, increase all items sizes relative to
     *        their original size so that they add up to 100
     *
     * @internal
     */
    calculateRelativeSizes() {
        let total = 0;
        const itemsWithFractionalSize = [];
        let totalFractionalSize = 0;
        for (let i = 0; i < this.contentItems.length; i++) {
            const contentItem = this.contentItems[i];
            const sizeUnit = contentItem.sizeUnit;
            switch (sizeUnit) {
                case types_1.SizeUnitEnum.Percent: {
                    total += contentItem.size;
                    break;
                }
                case types_1.SizeUnitEnum.Fractional: {
                    itemsWithFractionalSize.push(contentItem);
                    totalFractionalSize += contentItem.size;
                    break;
                }
                default:
                    throw new internal_error_1.AssertError('ROCCRS49110', JSON.stringify(contentItem));
            }
        }
        /**
         * Everything adds up to hundred, all good :-)
         */
        if (Math.round(total) === 100) {
            this.respectMinItemSize();
            return;
        }
        else {
            /**
             * Allocate the remaining size to the items with a fractional size
             */
            if (Math.round(total) < 100 && itemsWithFractionalSize.length > 0) {
                const fractionalAllocatedSize = 100 - total;
                for (let i = 0; i < itemsWithFractionalSize.length; i++) {
                    const contentItem = itemsWithFractionalSize[i];
                    contentItem.size = fractionalAllocatedSize * (contentItem.size / totalFractionalSize);
                    contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
                }
                this.respectMinItemSize();
                return;
            }
            else {
                /**
                 * If the total is > 100, but there are also items with a fractional size, assign another 50%
                 * to the fractional items
                 *
                 * This will be reset in the next step
                 */
                if (Math.round(total) > 100 && itemsWithFractionalSize.length > 0) {
                    for (let i = 0; i < itemsWithFractionalSize.length; i++) {
                        const contentItem = itemsWithFractionalSize[i];
                        contentItem.size = 50 * (contentItem.size / totalFractionalSize);
                        contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
                    }
                    total += 50;
                }
                /**
                 * Set every items size relative to 100 relative to its size to total
                 */
                for (let i = 0; i < this.contentItems.length; i++) {
                    const contentItem = this.contentItems[i];
                    contentItem.size = (contentItem.size / total) * 100;
                }
                this.respectMinItemSize();
            }
        }
    }
    /**
     * Adjusts the column widths to respect the dimensions minItemWidth if set.
     * @internal
     */
    respectMinItemSize() {
        const minItemSize = this.calculateContentItemMinSize(this);
        if (minItemSize <= 0 || this.contentItems.length <= 1) {
            return;
        }
        else {
            let totalOverMin = 0;
            let totalUnderMin = 0;
            const entriesOverMin = [];
            const allEntries = [];
            const absoluteSizes = this.calculateAbsoluteSizes();
            /**
             * Figure out how much we are under the min item size total and how much room we have to use.
             */
            for (let i = 0; i < absoluteSizes.itemSizes.length; i++) {
                const itemSize = absoluteSizes.itemSizes[i];
                let entry;
                if (itemSize < minItemSize) {
                    totalUnderMin += minItemSize - itemSize;
                    entry = {
                        size: minItemSize
                    };
                }
                else {
                    totalOverMin += itemSize - minItemSize;
                    entry = {
                        size: itemSize
                    };
                    entriesOverMin.push(entry);
                }
                allEntries.push(entry);
            }
            /**
             * If there is nothing under min, or there is not enough over to make up the difference, do nothing.
             */
            if (totalUnderMin === 0 || totalUnderMin > totalOverMin) {
                return;
            }
            else {
                /**
                 * Evenly reduce all columns that are over the min item width to make up the difference.
                 */
                const reducePercent = totalUnderMin / totalOverMin;
                let remainingSize = totalUnderMin;
                for (let i = 0; i < entriesOverMin.length; i++) {
                    const entry = entriesOverMin[i];
                    const reducedSize = Math.round((entry.size - minItemSize) * reducePercent);
                    remainingSize -= reducedSize;
                    entry.size -= reducedSize;
                }
                /**
                 * Take anything remaining from the last item.
                 */
                if (remainingSize !== 0) {
                    allEntries[allEntries.length - 1].size -= remainingSize;
                }
                /**
                 * Set every items size relative to 100 relative to its size to total
                 */
                for (let i = 0; i < this.contentItems.length; i++) {
                    const contentItem = this.contentItems[i];
                    contentItem.size = (allEntries[i].size / absoluteSizes.totalSize) * 100;
                }
            }
        }
    }
    /**
     * Instantiates a new Splitter, binds events to it and adds
     * it to the array of splitters at the position specified as the index argument
     *
     * What it doesn't do though is append the splitter to the DOM
     *
     * @param index - The position of the splitter
     *
     * @returns
     * @internal
     */
    createSplitter(index) {
        const splitter = new splitter_1.Splitter(this._isColumn, this._splitterSize, this._splitterGrabSize);
        splitter.on('drag', (offsetX, offsetY) => this.onSplitterDrag(splitter, offsetX, offsetY));
        splitter.on('dragStop', () => this.onSplitterDragStop(splitter));
        splitter.on('dragStart', () => this.onSplitterDragStart(splitter));
        this._splitter.splice(index, 0, splitter);
        return splitter;
    }
    /**
     * Locates the instance of Splitter in the array of
     * registered splitters and returns a map containing the contentItem
     * before and after the splitters, both of which are affected if the
     * splitter is moved
     *
     * @returns A map of contentItems that the splitter affects
     * @internal
     */
    getSplitItems(splitter) {
        const index = this._splitter.indexOf(splitter);
        return {
            before: this.contentItems[index],
            after: this.contentItems[index + 1]
        };
    }
    calculateContentItemMinSize(contentItem) {
        const minSize = contentItem.minSize;
        if (minSize !== undefined) {
            if (contentItem.minSizeUnit === types_1.SizeUnitEnum.Pixel) {
                return minSize;
            }
            else {
                throw new internal_error_1.AssertError('ROCGMD98831', JSON.stringify(contentItem));
            }
        }
        else {
            const dimensions = this.layoutManager.layoutConfig.dimensions;
            return this._isColumn ? dimensions.defaultMinItemHeight : dimensions.defaultMinItemWidth;
        }
    }
    /**
     * Gets the minimum dimensions for the given item configuration array
     * @internal
     */
    calculateContentItemsTotalMinSize(contentItems) {
        let totalMinSize = 0;
        for (const contentItem of contentItems) {
            totalMinSize += this.calculateContentItemMinSize(contentItem);
        }
        return totalMinSize;
    }
    /**
     * Invoked when a splitter's dragListener fires dragStart. Calculates the splitters
     * movement area once (so that it doesn't need calculating on every mousemove event)
     * @internal
     */
    onSplitterDragStart(splitter) {
        const items = this.getSplitItems(splitter);
        const beforeWidth = (0, utils_1.pixelsToNumber)(items.before.element.style[this._dimension]);
        const afterSize = (0, utils_1.pixelsToNumber)(items.after.element.style[this._dimension]);
        const beforeMinSize = this.calculateContentItemsTotalMinSize(items.before.contentItems);
        const afterMinSize = this.calculateContentItemsTotalMinSize(items.after.contentItems);
        this._splitterPosition = 0;
        this._splitterMinPosition = -1 * (beforeWidth - beforeMinSize);
        this._splitterMaxPosition = afterSize - afterMinSize;
    }
    /**
     * Invoked when a splitter's DragListener fires drag. Updates the splitter's DOM position,
     * but not the sizes of the elements the splitter controls in order to minimize resize events
     *
     * @param splitter -
     * @param offsetX - Relative pixel values to the splitter's original position. Can be negative
     * @param offsetY - Relative pixel values to the splitter's original position. Can be negative
     * @internal
     */
    onSplitterDrag(splitter, offsetX, offsetY) {
        let offset = this._isColumn ? offsetY : offsetX;
        if (this._splitterMinPosition === null || this._splitterMaxPosition === null) {
            throw new internal_error_1.UnexpectedNullError('ROCOSD59226');
        }
        offset = Math.max(offset, this._splitterMinPosition);
        offset = Math.min(offset, this._splitterMaxPosition);
        this._splitterPosition = offset;
        const offsetPixels = (0, utils_1.numberToPixels)(offset);
        if (this._isColumn) {
            splitter.element.style.top = offsetPixels;
        }
        else {
            splitter.element.style.left = offsetPixels;
        }
    }
    /**
     * Invoked when a splitter's DragListener fires dragStop. Resets the splitters DOM position,
     * and applies the new sizes to the elements before and after the splitter and their children
     * on the next animation frame
     * @internal
     */
    onSplitterDragStop(splitter) {
        if (this._splitterPosition === null) {
            throw new internal_error_1.UnexpectedNullError('ROCOSDS66932');
        }
        else {
            const items = this.getSplitItems(splitter);
            const sizeBefore = (0, utils_1.pixelsToNumber)(items.before.element.style[this._dimension]);
            const sizeAfter = (0, utils_1.pixelsToNumber)(items.after.element.style[this._dimension]);
            const splitterPositionInRange = (this._splitterPosition + sizeBefore) / (sizeBefore + sizeAfter);
            const totalRelativeSize = items.before.size + items.after.size;
            items.before.size = splitterPositionInRange * totalRelativeSize;
            items.after.size = (1 - splitterPositionInRange) * totalRelativeSize;
            splitter.element.style.top = (0, utils_1.numberToPixels)(0);
            splitter.element.style.left = (0, utils_1.numberToPixels)(0);
            globalThis.requestAnimationFrame(() => this.updateSize(false));
        }
    }
}
exports.RowOrColumn = RowOrColumn;
/** @public */
(function (RowOrColumn) {
    /** @internal */
    function getElementDimensionSize(element, dimension) {
        if (dimension === 'width') {
            return (0, utils_1.getElementWidth)(element);
        }
        else {
            return (0, utils_1.getElementHeight)(element);
        }
    }
    RowOrColumn.getElementDimensionSize = getElementDimensionSize;
    /** @internal */
    function setElementDimensionSize(element, dimension, value) {
        if (dimension === 'width') {
            return (0, utils_1.setElementWidth)(element, value);
        }
        else {
            return (0, utils_1.setElementHeight)(element, value);
        }
    }
    RowOrColumn.setElementDimensionSize = setElementDimensionSize;
    /** @internal */
    function createElement(document, isColumn) {
        const element = document.createElement('div');
        element.classList.add("lm_item" /* Item */);
        if (isColumn) {
            element.classList.add("lm_column" /* Column */);
        }
        else {
            element.classList.add("lm_row" /* Row */);
        }
        return element;
    }
    RowOrColumn.createElement = createElement;
})(RowOrColumn = exports.RowOrColumn || (exports.RowOrColumn = {}));

},{"../config/config":3,"../controls/splitter":12,"../errors/internal-error":17,"../utils/types":32,"../utils/utils":33,"./content-item":21}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
const config_1 = require("../config/config");
const resolved_config_1 = require("../config/resolved-config");
const header_1 = require("../controls/header");
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("../utils/event-emitter");
const types_1 = require("../utils/types");
const utils_1 = require("../utils/utils");
const component_item_1 = require("./component-item");
const component_parentable_item_1 = require("./component-parentable-item");
const content_item_1 = require("./content-item");
/** @public */
class Stack extends component_parentable_item_1.ComponentParentableItem {
    /** @internal */
    constructor(layoutManager, config, parent) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        super(layoutManager, config, parent, Stack.createElement(document));
        /** @internal */
        this._headerSideChanged = false;
        /** @internal */
        this._resizeListener = () => this.handleResize();
        /** @internal */
        this._maximisedListener = () => this.handleMaximised();
        /** @internal */
        this._minimisedListener = () => this.handleMinimised();
        this._headerConfig = config.header;
        const layoutHeaderConfig = layoutManager.layoutConfig.header;
        const configContent = config.content;
        // If stack has only one component, then we can also check this for header settings
        let componentHeaderConfig;
        if (configContent.length !== 1) {
            componentHeaderConfig = undefined;
        }
        else {
            const firstChildItemConfig = configContent[0];
            componentHeaderConfig = firstChildItemConfig.header; // will be undefined if not component (and wont be stack)
        }
        this._initialWantMaximise = config.maximised;
        this._initialActiveItemIndex = (_a = config.activeItemIndex) !== null && _a !== void 0 ? _a : 0; // make sure defined
        // check for defined value for each item in order of Stack (this Item), Component (first child), Manager.
        const show = (_d = (_c = (_b = this._headerConfig) === null || _b === void 0 ? void 0 : _b.show) !== null && _c !== void 0 ? _c : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.show) !== null && _d !== void 0 ? _d : layoutHeaderConfig.show;
        const popout = (_g = (_f = (_e = this._headerConfig) === null || _e === void 0 ? void 0 : _e.popout) !== null && _f !== void 0 ? _f : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.popout) !== null && _g !== void 0 ? _g : layoutHeaderConfig.popout;
        const maximise = (_k = (_j = (_h = this._headerConfig) === null || _h === void 0 ? void 0 : _h.maximise) !== null && _j !== void 0 ? _j : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.maximise) !== null && _k !== void 0 ? _k : layoutHeaderConfig.maximise;
        const close = (_o = (_m = (_l = this._headerConfig) === null || _l === void 0 ? void 0 : _l.close) !== null && _m !== void 0 ? _m : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.close) !== null && _o !== void 0 ? _o : layoutHeaderConfig.close;
        const minimise = (_r = (_q = (_p = this._headerConfig) === null || _p === void 0 ? void 0 : _p.minimise) !== null && _q !== void 0 ? _q : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.minimise) !== null && _r !== void 0 ? _r : layoutHeaderConfig.minimise;
        const tabDropdown = (_u = (_t = (_s = this._headerConfig) === null || _s === void 0 ? void 0 : _s.tabDropdown) !== null && _t !== void 0 ? _t : componentHeaderConfig === null || componentHeaderConfig === void 0 ? void 0 : componentHeaderConfig.tabDropdown) !== null && _u !== void 0 ? _u : layoutHeaderConfig.tabDropdown;
        this._maximisedEnabled = maximise !== false;
        const headerSettings = {
            show: show !== false,
            side: show === false ? types_1.Side.top : show,
            popoutEnabled: popout !== false,
            popoutLabel: popout === false ? '' : popout,
            maximiseEnabled: this._maximisedEnabled,
            maximiseLabel: maximise === false ? '' : maximise,
            closeEnabled: close !== false,
            closeLabel: close === false ? '' : close,
            minimiseEnabled: true,
            minimiseLabel: minimise,
            tabDropdownEnabled: tabDropdown !== false,
            tabDropdownLabel: tabDropdown === false ? '' : tabDropdown,
        };
        this._header = new header_1.Header(layoutManager, this, headerSettings, config.isClosable && close !== false, () => this.getActiveComponentItem(), () => this.remove(), () => this.handlePopoutEvent(), () => this.toggleMaximise(), (ev) => this.handleHeaderClickEvent(ev), (ev) => this.handleHeaderTouchStartEvent(ev), (item) => this.handleHeaderComponentRemoveEvent(item), (item) => this.handleHeaderComponentFocusEvent(item), (x, y, dragListener, item) => this.handleHeaderComponentStartDragEvent(x, y, dragListener, item));
        // this._dropZones = {};
        this.isStack = true;
        this._childElementContainer = document.createElement('section');
        this._childElementContainer.classList.add("lm_items" /* Items */);
        this.on('resize', this._resizeListener);
        if (this._maximisedEnabled) {
            this.on('maximised', this._maximisedListener);
            this.on('minimised', this._minimisedListener);
        }
        this.element.appendChild(this._header.element);
        this.element.appendChild(this._childElementContainer);
        this.setupHeaderPosition();
        this._header.updateClosability();
    }
    get childElementContainer() { return this._childElementContainer; }
    get header() { return this._header; }
    get headerShow() { return this._header.show; }
    get headerSide() { return this._header.side; }
    get headerLeftRightSided() { return this._header.leftRightSided; }
    /** @internal */
    get contentAreaDimensions() { return this._contentAreaDimensions; }
    /** @internal */
    get initialWantMaximise() { return this._initialWantMaximise; }
    get isMaximised() { return this === this.layoutManager.maximisedStack; }
    get stackParent() {
        if (!this.parent) {
            throw new Error('Stack should always have a parent');
        }
        return this.parent;
    }
    /** @internal */
    updateSize(force) {
        this.layoutManager.beginVirtualSizedContainerAdding();
        try {
            this.updateNodeSize();
            this.updateContentItemsSize(force);
        }
        finally {
            this.layoutManager.endVirtualSizedContainerAdding();
        }
    }
    /** @internal */
    init() {
        if (this.isInitialised === true)
            return;
        this.updateNodeSize();
        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }
        super.init();
        const contentItems = this.contentItems;
        const contentItemCount = contentItems.length;
        if (contentItemCount > 0) { // contentItemCount will be 0 on drag drop
            if (this._initialActiveItemIndex < 0 || this._initialActiveItemIndex >= contentItemCount) {
                throw new Error(`ActiveItemIndex out of range: ${this._initialActiveItemIndex} id: ${this.id}`);
            }
            else {
                for (let i = 0; i < contentItemCount; i++) {
                    const contentItem = contentItems[i];
                    if (!(contentItem instanceof component_item_1.ComponentItem)) {
                        throw new Error(`Stack Content Item is not of type ComponentItem: ${i} id: ${this.id}`);
                    }
                    else {
                        this._header.createTab(contentItem, i);
                        contentItem.hide();
                        contentItem.container.setBaseLogicalZIndex();
                    }
                }
                this.setActiveComponentItem(contentItems[this._initialActiveItemIndex], false);
                this._header.updateTabSizes();
            }
        }
        this._header.updateClosability();
        this.initContentItems();
    }
    /** @deprecated Use {@link (Stack:class).setActiveComponentItem} */
    setActiveContentItem(item) {
        if (!content_item_1.ContentItem.isComponentItem(item)) {
            throw new Error('Stack.setActiveContentItem: item is not a ComponentItem');
        }
        else {
            this.setActiveComponentItem(item, false);
        }
    }
    setActiveComponentItem(componentItem, focus, suppressFocusEvent = false) {
        if (this._activeComponentItem !== componentItem) {
            if (this.contentItems.indexOf(componentItem) === -1) {
                throw new Error('componentItem is not a child of this stack');
            }
            else {
                this.layoutManager.beginSizeInvalidation();
                try {
                    if (this._activeComponentItem !== undefined) {
                        this._activeComponentItem.hide();
                    }
                    this._activeComponentItem = componentItem;
                    this._header.processActiveComponentChanged(componentItem);
                    componentItem.show();
                }
                finally {
                    this.layoutManager.endSizeInvalidation();
                }
                this.emit('activeContentItemChanged', componentItem);
                this.layoutManager.emit('activeContentItemChanged', componentItem);
                this.emitStateChangedEvent();
            }
        }
        if (this.focused || focus) {
            this.layoutManager.setFocusedComponentItem(componentItem, suppressFocusEvent);
        }
    }
    /** @deprecated Use {@link (Stack:class).getActiveComponentItem} */
    getActiveContentItem() {
        var _a;
        return (_a = this.getActiveComponentItem()) !== null && _a !== void 0 ? _a : null;
    }
    getActiveComponentItem() {
        return this._activeComponentItem;
    }
    /** @internal */
    focusActiveContentItem() {
        var _a;
        (_a = this._activeComponentItem) === null || _a === void 0 ? void 0 : _a.focus();
    }
    /** @internal */
    setFocusedValue(value) {
        this._header.applyFocusedValue(value);
        super.setFocusedValue(value);
    }
    /** @internal */
    setRowColumnClosable(value) {
        this._header.setRowColumnClosable(value);
    }
    newComponent(componentType, componentState, title, index) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.newItem(itemConfig, index);
    }
    addComponent(componentType, componentState, title, index) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.addItem(itemConfig, index);
    }
    newItem(itemConfig, index) {
        index = this.addItem(itemConfig, index);
        return this.contentItems[index];
    }
    addItem(itemConfig, index) {
        this.layoutManager.checkMinimiseMaximisedStack();
        const resolvedItemConfig = config_1.ItemConfig.resolve(itemConfig, false);
        const contentItem = this.layoutManager.createAndInitContentItem(resolvedItemConfig, this);
        return this.addChild(contentItem, index);
    }
    addChild(contentItem, index, focus = false) {
        if (index !== undefined && index > this.contentItems.length) {
            index -= 1;
            throw new internal_error_1.AssertError('SAC99728'); // undisplayChild() removed so this condition should no longer occur
        }
        if (!(contentItem instanceof component_item_1.ComponentItem)) {
            throw new internal_error_1.AssertError('SACC88532'); // Stacks can only have Component children
        }
        else {
            index = super.addChild(contentItem, index);
            this._childElementContainer.appendChild(contentItem.element);
            this._header.createTab(contentItem, index);
            this.setActiveComponentItem(contentItem, focus);
            this._header.updateTabSizes();
            this.updateSize(false);
            contentItem.container.setBaseLogicalZIndex();
            this._header.updateClosability();
            this.emitStateChangedEvent();
            return index;
        }
    }
    removeChild(contentItem, keepChild) {
        const componentItem = contentItem;
        const index = this.contentItems.indexOf(componentItem);
        const stackWillBeDeleted = this.contentItems.length === 1;
        if (this._activeComponentItem === componentItem) {
            if (componentItem.focused) {
                componentItem.blur();
            }
            if (!stackWillBeDeleted) {
                // At this point we're already sure we have at least one content item left *after*
                // removing contentItem, so we can safely assume index 1 is a valid one if
                // the index of contentItem is 0, otherwise we just use the previous content item.
                const newActiveComponentIdx = index === 0 ? 1 : index - 1;
                this.setActiveComponentItem(this.contentItems[newActiveComponentIdx], false);
            }
        }
        this._header.removeTab(componentItem);
        super.removeChild(componentItem, keepChild);
        if (!stackWillBeDeleted) {
            this._header.updateClosability();
        }
        this.emitStateChangedEvent();
    }
    /**
     * Maximises the Item or minimises it if it is already maximised
     */
    toggleMaximise() {
        if (this.isMaximised) {
            this.minimise();
        }
        else {
            this.maximise();
        }
    }
    maximise() {
        if (!this.isMaximised) {
            this.layoutManager.setMaximisedStack(this);
            const contentItems = this.contentItems;
            const contentItemCount = contentItems.length;
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                if (contentItem instanceof component_item_1.ComponentItem) {
                    contentItem.enterStackMaximised();
                }
                else {
                    throw new internal_error_1.AssertError('SMAXI87773');
                }
            }
            this.emitStateChangedEvent();
        }
    }
    minimise() {
        if (this.isMaximised) {
            this.layoutManager.setMaximisedStack(undefined);
            const contentItems = this.contentItems;
            const contentItemCount = contentItems.length;
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                if (contentItem instanceof component_item_1.ComponentItem) {
                    contentItem.exitStackMaximised();
                }
                else {
                    throw new internal_error_1.AssertError('SMINI87773');
                }
            }
            this.emitStateChangedEvent();
        }
    }
    /** @internal */
    destroy() {
        var _a;
        if ((_a = this._activeComponentItem) === null || _a === void 0 ? void 0 : _a.focused) {
            this._activeComponentItem.blur();
        }
        super.destroy();
        this.off('resize', this._resizeListener);
        if (this._maximisedEnabled) {
            this.off('maximised', this._maximisedListener);
            this.off('minimised', this._minimisedListener);
        }
        this._header.destroy();
    }
    toConfig() {
        let activeItemIndex;
        if (this._activeComponentItem) {
            activeItemIndex = this.contentItems.indexOf(this._activeComponentItem);
            if (activeItemIndex < 0) {
                throw new Error('active component item not found in stack');
            }
        }
        if (this.contentItems.length > 0 && activeItemIndex === undefined) {
            throw new Error('expected non-empty stack to have an active component item');
        }
        else {
            const result = {
                type: 'stack',
                content: this.calculateConfigContent(),
                size: this.size,
                sizeUnit: this.sizeUnit,
                minSize: this.minSize,
                minSizeUnit: this.minSizeUnit,
                id: this.id,
                isClosable: this.isClosable,
                maximised: this.isMaximised,
                header: this.createHeaderConfig(),
                activeItemIndex,
            };
            return result;
        }
    }
    /**
     * Ok, this one is going to be the tricky one: The user has dropped a {@link (ContentItem:class)} onto this stack.
     *
     * It was dropped on either the stacks header or the top, right, bottom or left bit of the content area
     * (which one of those is stored in this._dropSegment). Now, if the user has dropped on the header the case
     * is relatively clear: We add the item to the existing stack... job done (might be good to have
     * tab reordering at some point, but lets not sweat it right now)
     *
     * If the item was dropped on the content part things are a bit more complicated. If it was dropped on either the
     * top or bottom region we need to create a new column and place the items accordingly.
     * Unless, of course if the stack is already within a column... in which case we want
     * to add the newly created item to the existing column...
     * either prepend or append it, depending on wether its top or bottom.
     *
     * Same thing for rows and left / right drop segments... so in total there are 9 things that can potentially happen
     * (left, top, right, bottom) * is child of the right parent (row, column) + header drop
     *
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDrop(contentItem, area) {
        /*
         * The item was dropped on the header area. Just add it as a child of this stack and
         * get the hell out of this logic
         */
        if (this._dropSegment === "header" /* Header */) {
            this.resetHeaderDropZone();
            if (this._dropIndex === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('SODDI68990');
            }
            else {
                this.addChild(contentItem, this._dropIndex);
                return;
            }
        }
        /*
         * The stack is empty. Let's just add the element.
         */
        if (this._dropSegment === "body" /* Body */) {
            this.addChild(contentItem, 0, true);
            return;
        }
        /*
         * The item was dropped on the top-, left-, bottom- or right- part of the content. Let's
         * aggregate some conditions to make the if statements later on more readable
         */
        const isVertical = this._dropSegment === "top" /* Top */ || this._dropSegment === "bottom" /* Bottom */;
        const isHorizontal = this._dropSegment === "left" /* Left */ || this._dropSegment === "right" /* Right */;
        const insertBefore = this._dropSegment === "top" /* Top */ || this._dropSegment === "left" /* Left */;
        const hasCorrectParent = (isVertical && this.stackParent.isColumn) || (isHorizontal && this.stackParent.isRow);
        /*
         * The content item can be either a component or a stack. If it is a component, wrap it into a stack
         */
        if (contentItem.isComponent) {
            const itemConfig = resolved_config_1.ResolvedStackItemConfig.createDefault();
            itemConfig.header = this.createHeaderConfig();
            const stack = this.layoutManager.createAndInitContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }
        /*
         * If the contentItem that's being dropped is not dropped on a Stack (cases which just passed above and
         * which would wrap the contentItem in a Stack) we need to check whether contentItem is a RowOrColumn.
         * If it is, we need to re-wrap it in a Stack like it was when it was dragged by its Tab (it was dragged!).
         */
        if (contentItem.type === types_1.ItemType.row || contentItem.type === types_1.ItemType.column) {
            const itemConfig = resolved_config_1.ResolvedStackItemConfig.createDefault();
            itemConfig.header = this.createHeaderConfig();
            const stack = this.layoutManager.createContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }
        /*
         * If the item is dropped on top or bottom of a column or left and right of a row, it's already
         * layd out in the correct way. Just add it as a child
         */
        if (hasCorrectParent) {
            const index = this.stackParent.contentItems.indexOf(this);
            this.stackParent.addChild(contentItem, insertBefore ? index : index + 1, true);
            this.size *= 0.5;
            contentItem.size = this.size;
            contentItem.sizeUnit = this.sizeUnit;
            this.stackParent.updateSize(false);
            /*
             * This handles items that are dropped on top or bottom of a row or left / right of a column. We need
             * to create the appropriate contentItem for them to live in
             */
        }
        else {
            const type = isVertical ? types_1.ItemType.column : types_1.ItemType.row;
            const itemConfig = resolved_config_1.ResolvedItemConfig.createDefault(type);
            const rowOrColumn = this.layoutManager.createContentItem(itemConfig, this);
            this.stackParent.replaceChild(this, rowOrColumn);
            rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
            rowOrColumn.addChild(this, insertBefore ? undefined : 0, true);
            this.size = 50;
            contentItem.size = 50;
            contentItem.sizeUnit = types_1.SizeUnitEnum.Percent;
            rowOrColumn.updateSize(false);
        }
    }
    /**
     * If the user hovers above the header part of the stack, indicate drop positions for tabs.
     * otherwise indicate which segment of the body the dragged item would be dropped on
     *
     * @param x - Absolute Screen X
     * @param y - Absolute Screen Y
     * @internal
     */
    highlightDropZone(x, y) {
        for (const key in this._contentAreaDimensions) {
            const segment = key;
            const area = this._contentAreaDimensions[segment].hoverArea;
            if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {
                if (segment === "header" /* Header */) {
                    this._dropSegment = "header" /* Header */;
                    this.highlightHeaderDropZone(this._header.leftRightSided ? y : x);
                }
                else {
                    this.resetHeaderDropZone();
                    this.highlightBodyDropZone(segment);
                }
                return;
            }
        }
    }
    /** @internal */
    getArea() {
        if (this.element.style.display === 'none') {
            return null;
        }
        const headerArea = super.getElementArea(this._header.element);
        const contentArea = super.getElementArea(this._childElementContainer);
        if (headerArea === null || contentArea === null) {
            throw new internal_error_1.UnexpectedNullError('SGAHC13086');
        }
        const contentWidth = contentArea.x2 - contentArea.x1;
        const contentHeight = contentArea.y2 - contentArea.y1;
        this._contentAreaDimensions = {
            header: {
                hoverArea: {
                    x1: headerArea.x1,
                    y1: headerArea.y1,
                    x2: headerArea.x2,
                    y2: headerArea.y2
                },
                highlightArea: {
                    x1: headerArea.x1,
                    y1: headerArea.y1,
                    x2: headerArea.x2,
                    y2: headerArea.y2
                }
            }
        };
        /**
         * Highlight the entire body if the stack is empty
         */
        if (this.contentItems.length === 0) {
            this._contentAreaDimensions.body = {
                hoverArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                }
            };
            return super.getElementArea(this.element);
        }
        else {
            this._contentAreaDimensions.left = {
                hoverArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x1 + contentWidth * 0.25,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x1 + contentWidth * 0.5,
                    y2: contentArea.y2
                }
            };
            this._contentAreaDimensions.top = {
                hoverArea: {
                    x1: contentArea.x1 + contentWidth * 0.25,
                    y1: contentArea.y1,
                    x2: contentArea.x1 + contentWidth * 0.75,
                    y2: contentArea.y1 + contentHeight * 0.5
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y1 + contentHeight * 0.5
                }
            };
            this._contentAreaDimensions.right = {
                hoverArea: {
                    x1: contentArea.x1 + contentWidth * 0.75,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1 + contentWidth * 0.5,
                    y1: contentArea.y1,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                }
            };
            this._contentAreaDimensions.bottom = {
                hoverArea: {
                    x1: contentArea.x1 + contentWidth * 0.25,
                    y1: contentArea.y1 + contentHeight * 0.5,
                    x2: contentArea.x1 + contentWidth * 0.75,
                    y2: contentArea.y2
                },
                highlightArea: {
                    x1: contentArea.x1,
                    y1: contentArea.y1 + contentHeight * 0.5,
                    x2: contentArea.x2,
                    y2: contentArea.y2
                }
            };
            return super.getElementArea(this.element);
        }
    }
    /**
     * Programmatically operate with header position.
     *
     * @param position -
     *
     * @returns previous header position
     * @internal
     */
    positionHeader(position) {
        if (this._header.side !== position) {
            this._header.setSide(position);
            this._headerSideChanged = true;
            this.setupHeaderPosition();
        }
    }
    /** @internal */
    updateNodeSize() {
        if (this.element.style.display !== 'none') {
            const content = (0, utils_1.getElementWidthAndHeight)(this.element);
            if (this._header.show) {
                const dimension = this._header.leftRightSided ? types_1.WidthOrHeightPropertyName.width : types_1.WidthOrHeightPropertyName.height;
                content[dimension] -= this.layoutManager.layoutConfig.dimensions.headerHeight;
            }
            this._childElementContainer.style.width = (0, utils_1.numberToPixels)(content.width);
            this._childElementContainer.style.height = (0, utils_1.numberToPixels)(content.height);
            for (let i = 0; i < this.contentItems.length; i++) {
                this.contentItems[i].element.style.width = (0, utils_1.numberToPixels)(content.width);
                this.contentItems[i].element.style.height = (0, utils_1.numberToPixels)(content.height);
            }
            this.emit('resize');
            this.emitStateChangedEvent();
        }
    }
    /** @internal */
    highlightHeaderDropZone(x) {
        const visibleTabsLength = this._header.lastVisibleTabIndex + 1;
        const tabsContainerElement = this._header.tabsContainerElement;
        const tabsContainerElementChildNodes = tabsContainerElement.childNodes;
        // Create shallow copy of childNodes list, excluding DropPlaceHolder, as we will be modifying the childNodes list
        const visibleTabElements = new Array(visibleTabsLength);
        let tabIndex = 0;
        let tabCount = 0;
        while (tabCount < visibleTabsLength) {
            const visibleTabElement = tabsContainerElementChildNodes[tabIndex++];
            if (visibleTabElement !== this.layoutManager.tabDropPlaceholder) {
                visibleTabElements[tabCount++] = visibleTabElement;
            }
        }
        const dropTargetIndicator = this.layoutManager.dropTargetIndicator;
        if (dropTargetIndicator === null) {
            throw new internal_error_1.UnexpectedNullError('SHHDZDTI97110');
        }
        let area;
        // Empty stack
        if (visibleTabsLength === 0) {
            const headerRect = this._header.element.getBoundingClientRect();
            const headerTop = headerRect.top + document.body.scrollTop;
            const headerLeft = headerRect.left + document.body.scrollLeft;
            area = {
                x1: headerLeft,
                x2: headerLeft + 100,
                y1: headerTop + headerRect.height - 20,
                y2: headerTop + headerRect.height,
            };
            this._dropIndex = 0;
        }
        else {
            let tabIndex = 0;
            // This indicates whether our cursor is exactly over a tab
            let isAboveTab = false;
            let tabTop;
            let tabLeft;
            let tabWidth;
            let tabElement;
            do {
                tabElement = visibleTabElements[tabIndex];
                const tabRect = tabElement.getBoundingClientRect();
                const tabRectTop = tabRect.top + document.body.scrollTop;
                const tabRectLeft = tabRect.left + document.body.scrollLeft;
                if (this._header.leftRightSided) {
                    tabLeft = tabRectTop;
                    tabTop = tabRectLeft;
                    tabWidth = tabRect.height;
                }
                else {
                    tabLeft = tabRectLeft;
                    tabTop = tabRectTop;
                    tabWidth = tabRect.width;
                }
                if (x >= tabLeft && x < tabLeft + tabWidth) {
                    isAboveTab = true;
                }
                else {
                    tabIndex++;
                }
            } while (tabIndex < visibleTabsLength && !isAboveTab);
            // If we're not above any tabs, or to the right of any tab, we are out of the area, so give up
            if (isAboveTab === false && x < tabLeft) {
                return;
            }
            const halfX = tabLeft + tabWidth / 2;
            if (x < halfX) {
                this._dropIndex = tabIndex;
                tabElement.insertAdjacentElement('beforebegin', this.layoutManager.tabDropPlaceholder);
            }
            else {
                this._dropIndex = Math.min(tabIndex + 1, visibleTabsLength);
                tabElement.insertAdjacentElement('afterend', this.layoutManager.tabDropPlaceholder);
            }
            const tabDropPlaceholderRect = this.layoutManager.tabDropPlaceholder.getBoundingClientRect();
            const tabDropPlaceholderRectTop = tabDropPlaceholderRect.top + document.body.scrollTop;
            const tabDropPlaceholderRectLeft = tabDropPlaceholderRect.left + document.body.scrollLeft;
            const tabDropPlaceholderRectWidth = tabDropPlaceholderRect.width;
            if (this._header.leftRightSided) {
                const placeHolderTop = tabDropPlaceholderRectTop;
                area = {
                    x1: tabTop,
                    x2: tabTop + tabElement.clientHeight,
                    y1: placeHolderTop,
                    y2: placeHolderTop + tabDropPlaceholderRectWidth,
                };
            }
            else {
                const placeHolderLeft = tabDropPlaceholderRectLeft;
                area = {
                    x1: placeHolderLeft,
                    x2: placeHolderLeft + tabDropPlaceholderRectWidth,
                    y1: tabTop,
                    y2: tabTop + tabElement.clientHeight,
                };
            }
        }
        dropTargetIndicator.highlightArea(area, 0);
        return;
    }
    /** @internal */
    resetHeaderDropZone() {
        this.layoutManager.tabDropPlaceholder.remove();
    }
    /** @internal */
    setupHeaderPosition() {
        (0, utils_1.setElementDisplayVisibility)(this._header.element, this._header.show);
        this.element.classList.remove("lm_left" /* Left */, "lm_right" /* Right */, "lm_bottom" /* Bottom */);
        if (this._header.leftRightSided) {
            this.element.classList.add('lm_' + this._header.side);
        }
        //if ([Side.right, Side.bottom].includes(this._header.side)) {
        //    // move the header behind the content.
        //    this.element.appendChild(this._header.element);
        //}
        this.updateSize(false);
    }
    /** @internal */
    highlightBodyDropZone(segment) {
        if (this._contentAreaDimensions === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('SHBDZC82265');
        }
        else {
            const highlightArea = this._contentAreaDimensions[segment].highlightArea;
            const dropTargetIndicator = this.layoutManager.dropTargetIndicator;
            if (dropTargetIndicator === null) {
                throw new internal_error_1.UnexpectedNullError('SHBDZD96110');
            }
            else {
                dropTargetIndicator.highlightArea(highlightArea, 1);
                this._dropSegment = segment;
            }
        }
    }
    /** @internal */
    handleResize() {
        this._header.updateTabSizes();
    }
    /** @internal */
    handleMaximised() {
        this._header.processMaximised();
    }
    /** @internal */
    handleMinimised() {
        this._header.processMinimised();
    }
    /** @internal */
    handlePopoutEvent() {
        this.popout();
    }
    /** @internal */
    handleHeaderClickEvent(ev) {
        const eventName = event_emitter_1.EventEmitter.headerClickEventName;
        const bubblingEvent = new event_emitter_1.EventEmitter.ClickBubblingEvent(eventName, this, ev);
        this.emit(eventName, bubblingEvent);
    }
    /** @internal */
    handleHeaderTouchStartEvent(ev) {
        const eventName = event_emitter_1.EventEmitter.headerTouchStartEventName;
        const bubblingEvent = new event_emitter_1.EventEmitter.TouchStartBubblingEvent(eventName, this, ev);
        this.emit(eventName, bubblingEvent);
    }
    /** @internal */
    handleHeaderComponentRemoveEvent(item) {
        this.removeChild(item, false);
    }
    /** @internal */
    handleHeaderComponentFocusEvent(item) {
        this.setActiveComponentItem(item, true);
    }
    /** @internal */
    handleHeaderComponentStartDragEvent(x, y, dragListener, componentItem) {
        if (this.isMaximised === true) {
            this.toggleMaximise();
        }
        this.layoutManager.startComponentDrag(x, y, dragListener, componentItem, this);
    }
    /** @internal */
    createHeaderConfig() {
        if (!this._headerSideChanged) {
            return resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(this._headerConfig);
        }
        else {
            const show = this._header.show ? this._header.side : false;
            let result = resolved_config_1.ResolvedHeaderedItemConfig.Header.createCopy(this._headerConfig, show);
            if (result === undefined) {
                result = {
                    show,
                    popout: undefined,
                    maximise: undefined,
                    close: undefined,
                    minimise: undefined,
                    tabDropdown: undefined,
                };
            }
            return result;
        }
    }
    /** @internal */
    emitStateChangedEvent() {
        this.emitBaseBubblingEvent('stateChanged');
    }
}
exports.Stack = Stack;
/** @public */
(function (Stack) {
    /** @internal */
    function createElement(document) {
        const element = document.createElement('div');
        element.classList.add("lm_item" /* Item */);
        element.classList.add("lm_stack" /* Stack */);
        return element;
    }
    Stack.createElement = createElement;
})(Stack = exports.Stack || (exports.Stack = {}));

},{"../config/config":3,"../config/resolved-config":4,"../controls/header":11,"../errors/internal-error":17,"../utils/event-emitter":28,"../utils/types":32,"../utils/utils":33,"./component-item":19,"./component-parentable-item":20,"./content-item":21}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutManager = void 0;
const config_1 = require("./config/config");
const resolved_config_1 = require("./config/resolved-config");
const browser_popout_1 = require("./controls/browser-popout");
const drag_proxy_1 = require("./controls/drag-proxy");
const drag_source_1 = require("./controls/drag-source");
const drop_target_indicator_1 = require("./controls/drop-target-indicator");
const transition_indicator_1 = require("./controls/transition-indicator");
const external_error_1 = require("./errors/external-error");
const internal_error_1 = require("./errors/internal-error");
const component_item_1 = require("./items/component-item");
const content_item_1 = require("./items/content-item");
const ground_item_1 = require("./items/ground-item");
const row_or_column_1 = require("./items/row-or-column");
const stack_1 = require("./items/stack");
const config_minifier_1 = require("./utils/config-minifier");
const event_emitter_1 = require("./utils/event-emitter");
const event_hub_1 = require("./utils/event-hub");
const i18n_strings_1 = require("./utils/i18n-strings");
const types_1 = require("./utils/types");
const utils_1 = require("./utils/utils");
/**
 * The main class that will be exposed as GoldenLayout.
 */
/** @public */
class LayoutManager extends event_emitter_1.EventEmitter {
    /**
    * @param container - A Dom HTML element. Defaults to body
    * @internal
    */
    constructor(parameters) {
        super();
        /** Whether the layout will be automatically be resized to container whenever the container's size is changed
         * Default is true if <body> is the container otherwise false
         * Default will be changed to true for any container in the future
         */
        this.resizeWithContainerAutomatically = false;
        /** The debounce interval (in milliseconds) used whenever a layout is automatically resized.  0 means next tick */
        this.resizeDebounceInterval = 100;
        /** Extend the current debounce delay time period if it is triggered during the delay.
         * If this is true, the layout will only resize when its container has stopped being resized.
         * If it is false, the layout will resize at intervals while its container is being resized.
         */
        this.resizeDebounceExtendedWhenPossible = true;
        /** @internal */
        this._isInitialised = false;
        /** @internal */
        this._groundItem = undefined;
        /** @internal */
        this._openPopouts = [];
        /** @internal */
        this._dropTargetIndicator = null;
        /** @internal */
        this._transitionIndicator = null;
        /** @internal */
        this._itemAreas = [];
        /** @internal */
        this._maximisePlaceholder = LayoutManager.createMaximisePlaceElement(document);
        /** @internal */
        this._tabDropPlaceholder = LayoutManager.createTabDropPlaceholderElement(document);
        /** @internal */
        this._dragSources = [];
        /** @internal */
        this._updatingColumnsResponsive = false;
        /** @internal */
        this._firstLoad = true;
        /** @internal */
        this._eventHub = new event_hub_1.EventHub(this);
        /** @internal */
        this._width = null;
        /** @internal */
        this._height = null;
        /** @internal */
        this._virtualSizedContainers = [];
        /** @internal */
        this._virtualSizedContainerAddingBeginCount = 0;
        /** @internal */
        this._sizeInvalidationBeginCount = 0;
        /** @internal */
        this._resizeObserver = new ResizeObserver(() => this.handleContainerResize());
        /** @internal @deprecated to be removed in version 3 */
        this._windowBeforeUnloadListener = () => this.onBeforeUnload();
        /** @internal @deprecated to be removed in version 3 */
        this._windowBeforeUnloadListening = false;
        /** @internal */
        this._maximisedStackBeforeDestroyedListener = (ev) => this.cleanupBeforeMaximisedStackDestroyed(ev);
        this.isSubWindow = parameters.isSubWindow;
        this._constructorOrSubWindowLayoutConfig = parameters.constructorOrSubWindowLayoutConfig;
        i18n_strings_1.I18nStrings.checkInitialise();
        config_minifier_1.ConfigMinifier.checkInitialise();
        if (parameters.containerElement !== undefined) {
            this._containerElement = parameters.containerElement;
        }
    }
    get container() { return this._containerElement; }
    get isInitialised() { return this._isInitialised; }
    /** @internal */
    get groundItem() { return this._groundItem; }
    /** @internal @deprecated use {@link (LayoutManager:class).groundItem} instead */
    get root() { return this._groundItem; }
    get openPopouts() { return this._openPopouts; }
    /** @internal */
    get dropTargetIndicator() { return this._dropTargetIndicator; }
    /** @internal @deprecated To be removed */
    get transitionIndicator() { return this._transitionIndicator; }
    get width() { return this._width; }
    get height() { return this._height; }
    /**
     * Retrieves the {@link (EventHub:class)} instance associated with this layout manager.
     * This can be used to propagate events between the windows
     * @public
     */
    get eventHub() { return this._eventHub; }
    get rootItem() {
        if (this._groundItem === undefined) {
            throw new Error('Cannot access rootItem before init');
        }
        else {
            const groundContentItems = this._groundItem.contentItems;
            if (groundContentItems.length === 0) {
                return undefined;
            }
            else {
                return this._groundItem.contentItems[0];
            }
        }
    }
    get focusedComponentItem() { return this._focusedComponentItem; }
    /** @internal */
    get tabDropPlaceholder() { return this._tabDropPlaceholder; }
    get maximisedStack() { return this._maximisedStack; }
    /** @deprecated indicates deprecated constructor use */
    get deprecatedConstructor() { return !this.isSubWindow && this._constructorOrSubWindowLayoutConfig !== undefined; }
    /**
     * Destroys the LayoutManager instance itself as well as every ContentItem
     * within it. After this is called nothing should be left of the LayoutManager.
     *
     * This function only needs to be called if an application wishes to destroy the Golden Layout object while
     * a page remains loaded. When a page is unloaded, all resources claimed by Golden Layout will automatically
     * be released.
     */
    destroy() {
        if (this._isInitialised) {
            if (this._windowBeforeUnloadListening) {
                globalThis.removeEventListener('beforeunload', this._windowBeforeUnloadListener);
                this._windowBeforeUnloadListening = false;
            }
            if (this.layoutConfig.settings.closePopoutsOnUnload === true) {
                this.closeAllOpenPopouts();
            }
            this._resizeObserver.disconnect();
            this.checkClearResizeTimeout();
            if (this._groundItem !== undefined) {
                this._groundItem.destroy();
            }
            this._tabDropPlaceholder.remove();
            if (this._dropTargetIndicator !== null) {
                this._dropTargetIndicator.destroy();
            }
            if (this._transitionIndicator !== null) {
                this._transitionIndicator.destroy();
            }
            this._eventHub.destroy();
            for (const dragSource of this._dragSources) {
                dragSource.destroy();
            }
            this._dragSources = [];
            this._isInitialised = false;
        }
    }
    /**
     * Takes a GoldenLayout configuration object and
     * replaces its keys and values recursively with
     * one letter codes
     * @deprecated use {@link (ResolvedLayoutConfig:namespace).minifyConfig} instead
     */
    minifyConfig(config) {
        return resolved_config_1.ResolvedLayoutConfig.minifyConfig(config);
    }
    /**
     * Takes a configuration Object that was previously minified
     * using minifyConfig and returns its original version
     * @deprecated use {@link (ResolvedLayoutConfig:namespace).unminifyConfig} instead
     */
    unminifyConfig(config) {
        return resolved_config_1.ResolvedLayoutConfig.unminifyConfig(config);
    }
    /**
     * Called from GoldenLayout class. Finishes of init
     * @internal
     */
    init() {
        this.setContainer();
        this._dropTargetIndicator = new drop_target_indicator_1.DropTargetIndicator( /*this.container*/);
        this._transitionIndicator = new transition_indicator_1.TransitionIndicator();
        this.updateSizeFromContainer();
        let subWindowRootConfig;
        if (this.isSubWindow) {
            if (this._constructorOrSubWindowLayoutConfig === undefined) {
                // SubWindow LayoutConfig should have been generated by constructor
                throw new internal_error_1.UnexpectedUndefinedError('LMIU07155');
            }
            else {
                const root = this._constructorOrSubWindowLayoutConfig.root;
                if (root === undefined) {
                    // SubWindow LayoutConfig must not be empty
                    throw new internal_error_1.AssertError('LMIC07156');
                }
                else {
                    if (config_1.ItemConfig.isComponent(root)) {
                        subWindowRootConfig = root;
                    }
                    else {
                        // SubWindow LayoutConfig must have Component as Root
                        throw new internal_error_1.AssertError('LMIC07157');
                    }
                }
                const resolvedLayoutConfig = config_1.LayoutConfig.resolve(this._constructorOrSubWindowLayoutConfig);
                // remove root from layoutConfig
                this.layoutConfig = Object.assign(Object.assign({}, resolvedLayoutConfig), { root: undefined });
            }
        }
        else {
            if (this._constructorOrSubWindowLayoutConfig === undefined) {
                this.layoutConfig = resolved_config_1.ResolvedLayoutConfig.createDefault(); // will overwritten be loaded via loadLayout
            }
            else {
                // backwards compatibility
                this.layoutConfig = config_1.LayoutConfig.resolve(this._constructorOrSubWindowLayoutConfig);
            }
        }
        const layoutConfig = this.layoutConfig;
        this._groundItem = new ground_item_1.GroundItem(this, layoutConfig.root, this._containerElement);
        this._groundItem.init();
        this.checkLoadedLayoutMaximiseItem();
        this._resizeObserver.observe(this._containerElement);
        this._isInitialised = true;
        this.adjustColumnsResponsive();
        this.emit('initialised');
        if (subWindowRootConfig !== undefined) {
            // must be SubWindow
            this.loadComponentAsRoot(subWindowRootConfig);
        }
    }
    /**
     * Loads a new layout
     * @param layoutConfig - New layout to be loaded
     */
    loadLayout(layoutConfig) {
        if (!this.isInitialised) {
            // In case application not correctly using legacy constructor
            throw new Error('GoldenLayout: Need to call init() if LayoutConfig with defined root passed to constructor');
        }
        else {
            if (this._groundItem === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('LMLL11119');
            }
            else {
                this.createSubWindows(); // still needs to be tested
                this.layoutConfig = config_1.LayoutConfig.resolve(layoutConfig);
                this._groundItem.loadRoot(this.layoutConfig.root);
                this.checkLoadedLayoutMaximiseItem();
                this.adjustColumnsResponsive();
            }
        }
    }
    /**
     * Creates a layout configuration object based on the the current state
     *
     * @public
     * @returns GoldenLayout configuration
     */
    saveLayout() {
        if (this._isInitialised === false) {
            throw new Error('Can\'t create config, layout not yet initialised');
        }
        else {
            // if (root !== undefined && !(root instanceof ContentItem)) {
            //     throw new Error('Root must be a ContentItem');
            // }
            /*
            * Content
            */
            if (this._groundItem === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('LMTC18244');
            }
            else {
                const groundContent = this._groundItem.calculateConfigContent();
                let rootItemConfig;
                if (groundContent.length !== 1) {
                    rootItemConfig = undefined;
                }
                else {
                    rootItemConfig = groundContent[0];
                }
                /*
                * Retrieve config for subwindows
                */
                this.reconcilePopoutWindows();
                const openPopouts = [];
                for (let i = 0; i < this._openPopouts.length; i++) {
                    openPopouts.push(this._openPopouts[i].toConfig());
                }
                const config = {
                    root: rootItemConfig,
                    openPopouts,
                    settings: resolved_config_1.ResolvedLayoutConfig.Settings.createCopy(this.layoutConfig.settings),
                    dimensions: resolved_config_1.ResolvedLayoutConfig.Dimensions.createCopy(this.layoutConfig.dimensions),
                    header: resolved_config_1.ResolvedLayoutConfig.Header.createCopy(this.layoutConfig.header),
                    resolved: true,
                };
                return config;
            }
        }
    }
    /**
     * Removes any existing layout. Effectively, an empty layout will be loaded.
     */
    clear() {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMCL11129');
        }
        else {
            this._groundItem.clearRoot();
        }
    }
    /**
     * @deprecated Use {@link (LayoutManager:class).saveLayout}
     */
    toConfig() {
        return this.saveLayout();
    }
    /**
     * Adds a new ComponentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added
     * @param componentTypeName - Name of component type to be created.
     * @param state - Optional initial state to be assigned to component
     * @returns New ComponentItem created.
     */
    newComponent(componentType, componentState, title) {
        const componentItem = this.newComponentAtLocation(componentType, componentState, title);
        if (componentItem === undefined) {
            throw new internal_error_1.AssertError('LMNC65588');
        }
        else {
            return componentItem;
        }
    }
    /**
     * Adds a ComponentItem at the first valid selector location.
     * @param componentTypeName - Name of component type to be created.
     * @param state - Optional initial state to be assigned to component
     * @param locationSelectors - Array of location selectors used to find location in layout where component
     * will be added. First location in array which is valid will be used. If locationSelectors is undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used
     * @returns New ComponentItem created or undefined if no valid location selector was in array.
     */
    newComponentAtLocation(componentType, componentState, title, locationSelectors) {
        if (this._groundItem === undefined) {
            throw new Error('Cannot add component before init');
        }
        else {
            const location = this.addComponentAtLocation(componentType, componentState, title, locationSelectors);
            if (location === undefined) {
                return undefined;
            }
            else {
                const createdItem = location.parentItem.contentItems[location.index];
                if (!content_item_1.ContentItem.isComponentItem(createdItem)) {
                    throw new internal_error_1.AssertError('LMNC992877533');
                }
                else {
                    return createdItem;
                }
            }
        }
    }
    /**
     * Adds a new ComponentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added
     * @param componentType - Type of component to be created.
     * @param state - Optional initial state to be assigned to component
     * @returns Location of new ComponentItem created.
     */
    addComponent(componentType, componentState, title) {
        const location = this.addComponentAtLocation(componentType, componentState, title);
        if (location === undefined) {
            throw new internal_error_1.AssertError('LMAC99943');
        }
        else {
            return location;
        }
    }
    /**
     * Adds a ComponentItem at the first valid selector location.
     * @param componentType - Type of component to be created.
     * @param state - Optional initial state to be assigned to component
     * @param locationSelectors - Array of location selectors used to find determine location in layout where component
     * will be added. First location in array which is valid will be used. If undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used.
     * @returns Location of new ComponentItem created or undefined if no valid location selector was in array.
     */
    addComponentAtLocation(componentType, componentState, title, locationSelectors) {
        const itemConfig = {
            type: 'component',
            componentType,
            componentState,
            title,
        };
        return this.addItemAtLocation(itemConfig, locationSelectors);
    }
    /**
     * Adds a new ContentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @returns New ContentItem created.
    */
    newItem(itemConfig) {
        const contentItem = this.newItemAtLocation(itemConfig);
        if (contentItem === undefined) {
            throw new internal_error_1.AssertError('LMNC65588');
        }
        else {
            return contentItem;
        }
    }
    /**
     * Adds a new child ContentItem under the root ContentItem.  If a root does not exist, then create root ContentItem instead
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @param locationSelectors - Array of location selectors used to find determine location in layout where ContentItem
     * will be added. First location in array which is valid will be used. If undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used.
     * @returns New ContentItem created or undefined if no valid location selector was in array. */
    newItemAtLocation(itemConfig, locationSelectors) {
        if (this._groundItem === undefined) {
            throw new Error('Cannot add component before init');
        }
        else {
            const location = this.addItemAtLocation(itemConfig, locationSelectors);
            if (location === undefined) {
                return undefined;
            }
            else {
                const createdItem = location.parentItem.contentItems[location.index];
                return createdItem;
            }
        }
    }
    /**
     * Adds a new ContentItem.  Will use default location selectors to ensure a location is found and
     * component is successfully added.
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @returns Location of new ContentItem created. */
    addItem(itemConfig) {
        const location = this.addItemAtLocation(itemConfig);
        if (location === undefined) {
            throw new internal_error_1.AssertError('LMAI99943');
        }
        else {
            return location;
        }
    }
    /**
     * Adds a ContentItem at the first valid selector location.
     * @param itemConfig - ResolvedItemConfig of child to be added.
     * @param locationSelectors - Array of location selectors used to find determine location in layout where ContentItem
     * will be added. First location in array which is valid will be used. If undefined,
     * {@link (LayoutManager:namespace).defaultLocationSelectors} will be used.
     * @returns Location of new ContentItem created or undefined if no valid location selector was in array. */
    addItemAtLocation(itemConfig, locationSelectors) {
        if (this._groundItem === undefined) {
            throw new Error('Cannot add component before init');
        }
        else {
            if (locationSelectors === undefined) {
                // defaultLocationSelectors should always find a location
                locationSelectors = LayoutManager.defaultLocationSelectors;
            }
            const location = this.findFirstLocation(locationSelectors);
            if (location === undefined) {
                return undefined;
            }
            else {
                let parentItem = location.parentItem;
                let addIdx;
                switch (parentItem.type) {
                    case types_1.ItemType.ground: {
                        const groundItem = parentItem;
                        addIdx = groundItem.addItem(itemConfig, location.index);
                        if (addIdx >= 0) {
                            parentItem = this._groundItem.contentItems[0]; // was added to rootItem
                        }
                        else {
                            addIdx = 0; // was added as rootItem (which is the first and only ContentItem in GroundItem)
                        }
                        break;
                    }
                    case types_1.ItemType.row:
                    case types_1.ItemType.column: {
                        const rowOrColumn = parentItem;
                        addIdx = rowOrColumn.addItem(itemConfig, location.index);
                        break;
                    }
                    case types_1.ItemType.stack: {
                        if (!config_1.ItemConfig.isComponent(itemConfig)) {
                            throw Error(i18n_strings_1.i18nStrings[6 /* ItemConfigIsNotTypeComponent */]);
                        }
                        else {
                            const stack = parentItem;
                            addIdx = stack.addItem(itemConfig, location.index);
                            break;
                        }
                    }
                    case types_1.ItemType.component: {
                        throw new internal_error_1.AssertError('LMAIALC87444602');
                    }
                    default:
                        throw new internal_error_1.UnreachableCaseError('LMAIALU98881733', parentItem.type);
                }
                if (config_1.ItemConfig.isComponent(itemConfig)) {
                    // see if stack was inserted
                    const item = parentItem.contentItems[addIdx];
                    if (content_item_1.ContentItem.isStack(item)) {
                        parentItem = item;
                        addIdx = 0;
                    }
                }
                location.parentItem = parentItem;
                location.index = addIdx;
                return location;
            }
        }
    }
    /** Loads the specified component ResolvedItemConfig as root.
     * This can be used to display a Component all by itself.  The layout cannot be changed other than having another new layout loaded.
     * Note that, if this layout is saved and reloaded, it will reload with the Component as a child of a Stack.
    */
    loadComponentAsRoot(itemConfig) {
        if (this._groundItem === undefined) {
            throw new Error('Cannot add item before init');
        }
        else {
            this._groundItem.loadComponentAsRoot(itemConfig);
        }
    }
    /** @deprecated Use {@link (LayoutManager:class).setSize} */
    updateSize(width, height) {
        this.setSize(width, height);
    }
    /**
     * Updates the layout managers size
     *
     * @param width - Width in pixels
     * @param height - Height in pixels
     */
    setSize(width, height) {
        this._width = width;
        this._height = height;
        if (this._isInitialised === true) {
            if (this._groundItem === undefined) {
                throw new internal_error_1.UnexpectedUndefinedError('LMUS18881');
            }
            else {
                this._groundItem.setSize(this._width, this._height);
                if (this._maximisedStack) {
                    const { width, height } = (0, utils_1.getElementWidthAndHeight)(this._containerElement);
                    (0, utils_1.setElementWidth)(this._maximisedStack.element, width);
                    (0, utils_1.setElementHeight)(this._maximisedStack.element, height);
                    this._maximisedStack.updateSize(false);
                }
                this.adjustColumnsResponsive();
            }
        }
    }
    /** @internal */
    beginSizeInvalidation() {
        this._sizeInvalidationBeginCount++;
    }
    /** @internal */
    endSizeInvalidation() {
        if (--this._sizeInvalidationBeginCount === 0) {
            this.updateSizeFromContainer();
        }
    }
    /** @internal */
    updateSizeFromContainer() {
        const { width, height } = (0, utils_1.getElementWidthAndHeight)(this._containerElement);
        this.setSize(width, height);
    }
    /**
     * Update the size of the root ContentItem.  This will update the size of all contentItems in the tree
     * @param force - In some cases the size is not updated if it has not changed. In this case, events
     * (such as ComponentContainer.virtualRectingRequiredEvent) are not fired. Setting force to true, ensures the size is updated regardless, and
     * the respective events are fired. This is sometimes necessary when a component's size has not changed but it has become visible, and the
     * relevant events need to be fired.
     */
    updateRootSize(force = false) {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMURS28881');
        }
        else {
            this._groundItem.updateSize(force);
        }
    }
    /** @public */
    createAndInitContentItem(config, parent) {
        const newItem = this.createContentItem(config, parent);
        newItem.init();
        return newItem;
    }
    /**
     * Recursively creates new item tree structures based on a provided
     * ItemConfiguration object
     *
     * @param config - ResolvedItemConfig
     * @param parent - The item the newly created item should be a child of
     * @internal
     */
    createContentItem(config, parent) {
        if (typeof config.type !== 'string') {
            throw new external_error_1.ConfigurationError('Missing parameter \'type\'', JSON.stringify(config));
        }
        /**
         * We add an additional stack around every component that's not within a stack anyways.
         */
        if (
        // If this is a component
        resolved_config_1.ResolvedItemConfig.isComponentItem(config) &&
            // and it's not already within a stack
            !(parent instanceof stack_1.Stack) &&
            // and we have a parent
            !!parent &&
            // and it's not the topmost item in a new window
            !(this.isSubWindow === true && parent instanceof ground_item_1.GroundItem)) {
            const stackConfig = {
                type: types_1.ItemType.stack,
                content: [config],
                size: config.size,
                sizeUnit: config.sizeUnit,
                minSize: config.minSize,
                minSizeUnit: config.minSizeUnit,
                id: config.id,
                maximised: config.maximised,
                isClosable: config.isClosable,
                activeItemIndex: 0,
                header: undefined,
            };
            config = stackConfig;
        }
        const contentItem = this.createContentItemFromConfig(config, parent);
        return contentItem;
    }
    findFirstComponentItemById(id) {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMFFCIBI82446');
        }
        else {
            return this.findFirstContentItemTypeByIdRecursive(types_1.ItemType.component, id, this._groundItem);
        }
    }
    /**
     * Creates a popout window with the specified content at the specified position
     *
     * @param itemConfigOrContentItem - The content of the popout window's layout manager derived from either
     * a {@link (ContentItem:class)} or {@link (ItemConfig:interface)} or ResolvedItemConfig content (array of {@link (ItemConfig:interface)})
     * @param positionAndSize - The width, height, left and top of Popout window
     * @param parentId -The id of the element this item will be appended to when popIn is called
     * @param indexInParent - The position of this item within its parent element
     */
    createPopout(itemConfigOrContentItem, positionAndSize, parentId, indexInParent) {
        if (itemConfigOrContentItem instanceof content_item_1.ContentItem) {
            return this.createPopoutFromContentItem(itemConfigOrContentItem, positionAndSize, parentId, indexInParent);
        }
        else {
            return this.createPopoutFromItemConfig(itemConfigOrContentItem, positionAndSize, parentId, indexInParent);
        }
    }
    /** @internal */
    createPopoutFromContentItem(item, window, parentId, indexInParent) {
        /**
         * If the item is the only component within a stack or for some
         * other reason the only child of its parent the parent will be destroyed
         * when the child is removed.
         *
         * In order to support this we move up the tree until we find something
         * that will remain after the item is being popped out
         */
        let parent = item.parent;
        let child = item;
        while (parent !== null && parent.contentItems.length === 1 && !parent.isGround) {
            child = parent;
            parent = parent.parent;
        }
        if (parent === null) {
            throw new internal_error_1.UnexpectedNullError('LMCPFCI00834');
        }
        else {
            if (indexInParent === undefined) {
                indexInParent = parent.contentItems.indexOf(child);
            }
            if (parentId !== null) {
                parent.addPopInParentId(parentId);
            }
            if (window === undefined) {
                const windowLeft = globalThis.screenX || globalThis.screenLeft;
                const windowTop = globalThis.screenY || globalThis.screenTop;
                const offsetLeft = item.element.offsetLeft;
                const offsetTop = item.element.offsetTop;
                // const { left: offsetLeft, top: offsetTop } = getJQueryLeftAndTop(item.element);
                const { width, height } = (0, utils_1.getElementWidthAndHeight)(item.element);
                window = {
                    left: windowLeft + offsetLeft,
                    top: windowTop + offsetTop,
                    width,
                    height,
                };
            }
            const itemConfig = item.toConfig();
            item.remove();
            if (!resolved_config_1.ResolvedRootItemConfig.isRootItemConfig(itemConfig)) {
                throw new Error(`${i18n_strings_1.i18nStrings[0 /* PopoutCannotBeCreatedWithGroundItemConfig */]}`);
            }
            else {
                return this.createPopoutFromItemConfig(itemConfig, window, parentId, indexInParent);
            }
        }
    }
    /** @internal */
    beginVirtualSizedContainerAdding() {
        if (++this._virtualSizedContainerAddingBeginCount === 0) {
            this._virtualSizedContainers.length = 0;
        }
    }
    /** @internal */
    addVirtualSizedContainer(container) {
        this._virtualSizedContainers.push(container);
    }
    /** @internal */
    endVirtualSizedContainerAdding() {
        if (--this._virtualSizedContainerAddingBeginCount === 0) {
            const count = this._virtualSizedContainers.length;
            if (count > 0) {
                this.fireBeforeVirtualRectingEvent(count);
                for (let i = 0; i < count; i++) {
                    const container = this._virtualSizedContainers[i];
                    container.notifyVirtualRectingRequired();
                }
                this.fireAfterVirtualRectingEvent();
                this._virtualSizedContainers.length = 0;
            }
        }
    }
    /** @internal */
    fireBeforeVirtualRectingEvent(count) {
        if (this.beforeVirtualRectingEvent !== undefined) {
            this.beforeVirtualRectingEvent(count);
        }
    }
    /** @internal */
    fireAfterVirtualRectingEvent() {
        if (this.afterVirtualRectingEvent !== undefined) {
            this.afterVirtualRectingEvent();
        }
    }
    /** @internal */
    createPopoutFromItemConfig(rootItemConfig, window, parentId, indexInParent) {
        const layoutConfig = this.toConfig();
        const popoutLayoutConfig = {
            root: rootItemConfig,
            openPopouts: [],
            settings: layoutConfig.settings,
            dimensions: layoutConfig.dimensions,
            header: layoutConfig.header,
            window,
            parentId,
            indexInParent,
            resolved: true,
        };
        return this.createPopoutFromPopoutLayoutConfig(popoutLayoutConfig);
    }
    /** @internal */
    createPopoutFromPopoutLayoutConfig(config) {
        var _a, _b, _c, _d;
        const configWindow = config.window;
        const initialWindow = {
            left: (_a = configWindow.left) !== null && _a !== void 0 ? _a : (globalThis.screenX || globalThis.screenLeft + 20),
            top: (_b = configWindow.top) !== null && _b !== void 0 ? _b : (globalThis.screenY || globalThis.screenTop + 20),
            width: (_c = configWindow.width) !== null && _c !== void 0 ? _c : 500,
            height: (_d = configWindow.height) !== null && _d !== void 0 ? _d : 309,
        };
        const browserPopout = new browser_popout_1.BrowserPopout(config, initialWindow, this);
        browserPopout.on('initialised', () => this.emit('windowOpened', browserPopout));
        browserPopout.on('closed', () => this.reconcilePopoutWindows());
        this._openPopouts.push(browserPopout);
        if (this.layoutConfig.settings.closePopoutsOnUnload && !this._windowBeforeUnloadListening) {
            globalThis.addEventListener('beforeunload', this._windowBeforeUnloadListener, { passive: true });
            this._windowBeforeUnloadListening = true;
        }
        return browserPopout;
    }
    /**
     * Closes all Open Popouts
     * Applications can call this method when a page is unloaded to remove its open popouts
     */
    closeAllOpenPopouts() {
        for (let i = 0; i < this._openPopouts.length; i++) {
            this._openPopouts[i].close();
        }
        this._openPopouts.length = 0;
        if (this._windowBeforeUnloadListening) {
            globalThis.removeEventListener('beforeunload', this._windowBeforeUnloadListener);
            this._windowBeforeUnloadListening = false;
        }
    }
    newDragSource(element, componentTypeOrItemConfigCallback, componentState, title, id) {
        const dragSource = new drag_source_1.DragSource(this, element, [], componentTypeOrItemConfigCallback, componentState, title, id);
        this._dragSources.push(dragSource);
        return dragSource;
    }
    /**
     * Removes a DragListener added by createDragSource() so the corresponding
     * DOM element is not a drag source any more.
     */
    removeDragSource(dragSource) {
        (0, utils_1.removeFromArray)(dragSource, this._dragSources);
        dragSource.destroy();
    }
    /** @internal */
    startComponentDrag(x, y, dragListener, componentItem, stack) {
        new drag_proxy_1.DragProxy(x, y, dragListener, this, componentItem, stack);
    }
    /**
     * Programmatically focuses an item. This focuses the specified component item
     * and the item emits a focus event
     *
     * @param item - The component item to be focused
     * @param suppressEvent - Whether to emit focus event
     */
    focusComponent(item, suppressEvent = false) {
        item.focus(suppressEvent);
    }
    /**
     * Programmatically blurs (defocuses) the currently focused component.
     * If a component item is focused, then it is blurred and and the item emits a blur event
     *
     * @param item - The component item to be blurred
     * @param suppressEvent - Whether to emit blur event
     */
    clearComponentFocus(suppressEvent = false) {
        this.setFocusedComponentItem(undefined, suppressEvent);
    }
    /**
     * Programmatically focuses a component item or removes focus (blurs) from an existing focused component item.
     *
     * @param item - If defined, specifies the component item to be given focus.  If undefined, clear component focus.
     * @param suppressEvents - Whether to emit focus and blur events
     * @internal
     */
    setFocusedComponentItem(item, suppressEvents = false) {
        if (item !== this._focusedComponentItem) {
            let newFocusedParentItem;
            if (item === undefined) {
                newFocusedParentItem === undefined;
            }
            else {
                newFocusedParentItem = item.parentItem;
            }
            if (this._focusedComponentItem !== undefined) {
                const oldFocusedItem = this._focusedComponentItem;
                this._focusedComponentItem = undefined;
                oldFocusedItem.setBlurred(suppressEvents);
                const oldFocusedParentItem = oldFocusedItem.parentItem;
                if (newFocusedParentItem === oldFocusedParentItem) {
                    newFocusedParentItem = undefined;
                }
                else {
                    oldFocusedParentItem.setFocusedValue(false);
                }
            }
            if (item !== undefined) {
                this._focusedComponentItem = item;
                item.setFocused(suppressEvents);
                if (newFocusedParentItem !== undefined) {
                    newFocusedParentItem.setFocusedValue(true);
                }
            }
        }
    }
    /** @internal */
    createContentItemFromConfig(config, parent) {
        switch (config.type) {
            case types_1.ItemType.ground: throw new internal_error_1.AssertError('LMCCIFC68871');
            case types_1.ItemType.row: return new row_or_column_1.RowOrColumn(false, this, config, parent);
            case types_1.ItemType.column: return new row_or_column_1.RowOrColumn(true, this, config, parent);
            case types_1.ItemType.stack: return new stack_1.Stack(this, config, parent);
            case types_1.ItemType.component:
                return new component_item_1.ComponentItem(this, config, parent);
            default:
                throw new internal_error_1.UnreachableCaseError('CCC913564', config.type, 'Invalid Config Item type specified');
        }
    }
    /**
     * This should only be called from stack component.
     * Stack will look after docking processing associated with maximise/minimise
     * @internal
     **/
    setMaximisedStack(stack) {
        if (stack === undefined) {
            if (this._maximisedStack !== undefined) {
                this.processMinimiseMaximisedStack();
            }
        }
        else {
            if (stack !== this._maximisedStack) {
                if (this._maximisedStack !== undefined) {
                    this.processMinimiseMaximisedStack();
                }
                this.processMaximiseStack(stack);
            }
        }
    }
    checkMinimiseMaximisedStack() {
        if (this._maximisedStack !== undefined) {
            this._maximisedStack.minimise();
        }
    }
    // showAllActiveContentItems() was called from ContentItem.show().  Not sure what its purpose was so have commented out
    // Everything seems to work ok without this.  Have left commented code just in case there was a reason for it becomes
    // apparent
    // /** @internal */
    // showAllActiveContentItems(): void {
    //     const allStacks = this.getAllStacks();
    //     for (let i = 0; i < allStacks.length; i++) {
    //         const stack = allStacks[i];
    //         const activeContentItem = stack.getActiveComponentItem();
    //         if (activeContentItem !== undefined) {
    //             if (!(activeContentItem instanceof ComponentItem)) {
    //                 throw new AssertError('LMSAACIS22298');
    //             } else {
    //                 activeContentItem.container.show();
    //             }
    //         }
    //     }
    // }
    // hideAllActiveContentItems() was called from ContentItem.hide().  Not sure what its purpose was so have commented out
    // Everything seems to work ok without this.  Have left commented code just in case there was a reason for it becomes
    // apparent
    // /** @internal */
    // hideAllActiveContentItems(): void {
    //     const allStacks = this.getAllStacks();
    //     for (let i = 0; i < allStacks.length; i++) {
    //         const stack = allStacks[i];
    //         const activeContentItem = stack.getActiveComponentItem();
    //         if (activeContentItem !== undefined) {
    //             if (!(activeContentItem instanceof ComponentItem)) {
    //                 throw new AssertError('LMSAACIH22298');
    //             } else {
    //                 activeContentItem.container.hide();
    //             }
    //         }
    //     }
    // }
    /** @internal */
    cleanupBeforeMaximisedStackDestroyed(event) {
        if (this._maximisedStack !== null && this._maximisedStack === event.target) {
            this._maximisedStack.off('beforeItemDestroyed', this._maximisedStackBeforeDestroyedListener);
            this._maximisedStack = undefined;
        }
    }
    /**
     * This method is used to get around sandboxed iframe restrictions.
     * If 'allow-top-navigation' is not specified in the iframe's 'sandbox' attribute
     * (as is the case with codepens) the parent window is forbidden from calling certain
     * methods on the child, such as window.close() or setting document.location.href.
     *
     * This prevented GoldenLayout popouts from popping in in codepens. The fix is to call
     * _$closeWindow on the child window's gl instance which (after a timeout to disconnect
     * the invoking method from the close call) closes itself.
     *
     * @internal
     */
    closeWindow() {
        globalThis.setTimeout(() => globalThis.close(), 1);
    }
    /** @internal */
    getArea(x, y) {
        let matchingArea = null;
        let smallestSurface = Infinity;
        for (let i = 0; i < this._itemAreas.length; i++) {
            const area = this._itemAreas[i];
            if (x >= area.x1 &&
                x < area.x2 && // x2 is not included in area
                y >= area.y1 &&
                y < area.y2 && // y2 is not included in area
                smallestSurface > area.surface) {
                smallestSurface = area.surface;
                matchingArea = area;
            }
        }
        return matchingArea;
    }
    /** @internal */
    calculateItemAreas() {
        const allContentItems = this.getAllContentItems();
        /**
         * If the last item is dragged out, highlight the entire container size to
         * allow to re-drop it. this.ground.contentiItems.length === 0 at this point
         *
         * Don't include ground into the possible drop areas though otherwise since it
         * will used for every gap in the layout, e.g. splitters
         */
        const groundItem = this._groundItem;
        if (groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMCIAR44365');
        }
        else {
            if (allContentItems.length === 1) {
                // No root ContentItem (just Ground ContentItem)
                const groundArea = groundItem.getElementArea();
                if (groundArea === null) {
                    throw new internal_error_1.UnexpectedNullError('LMCIARA44365');
                }
                else {
                    this._itemAreas = [groundArea];
                }
                return;
            }
            else {
                if (groundItem.contentItems[0].isStack) {
                    // if root is Stack, then split stack and sides of Layout are same, so skip sides
                    this._itemAreas = [];
                }
                else {
                    // sides of layout
                    this._itemAreas = groundItem.createSideAreas();
                }
                for (let i = 0; i < allContentItems.length; i++) {
                    const stack = allContentItems[i];
                    if (content_item_1.ContentItem.isStack(stack)) {
                        const area = stack.getArea();
                        if (area === null) {
                            continue;
                        }
                        else {
                            this._itemAreas.push(area);
                            const stackContentAreaDimensions = stack.contentAreaDimensions;
                            if (stackContentAreaDimensions === undefined) {
                                throw new internal_error_1.UnexpectedUndefinedError('LMCIASC45599');
                            }
                            else {
                                const highlightArea = stackContentAreaDimensions.header.highlightArea;
                                const surface = (highlightArea.x2 - highlightArea.x1) * (highlightArea.y2 - highlightArea.y1);
                                const header = {
                                    x1: highlightArea.x1,
                                    x2: highlightArea.x2,
                                    y1: highlightArea.y1,
                                    y2: highlightArea.y2,
                                    contentItem: stack,
                                    surface,
                                };
                                this._itemAreas.push(header);
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Called as part of loading a new layout (including initial init()).
     * Checks to see layout has a maximised item. If so, it maximises that item.
     * @internal
     */
    checkLoadedLayoutMaximiseItem() {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMCLLMI43432');
        }
        else {
            const configMaximisedItems = this._groundItem.getConfigMaximisedItems();
            if (configMaximisedItems.length > 0) {
                let item = configMaximisedItems[0];
                if (content_item_1.ContentItem.isComponentItem(item)) {
                    const stack = item.parent;
                    if (stack === null) {
                        throw new internal_error_1.UnexpectedNullError('LMXLLMI69999');
                    }
                    else {
                        item = stack;
                    }
                }
                if (!content_item_1.ContentItem.isStack(item)) {
                    throw new internal_error_1.AssertError('LMCLLMI19993');
                }
                else {
                    item.maximise();
                }
            }
        }
    }
    /** @internal */
    processMaximiseStack(stack) {
        this._maximisedStack = stack;
        stack.on('beforeItemDestroyed', this._maximisedStackBeforeDestroyedListener);
        stack.element.classList.add("lm_maximised" /* Maximised */);
        stack.element.insertAdjacentElement('afterend', this._maximisePlaceholder);
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMMXI19993');
        }
        else {
            this._groundItem.element.prepend(stack.element);
            const { width, height } = (0, utils_1.getElementWidthAndHeight)(this._containerElement);
            (0, utils_1.setElementWidth)(stack.element, width);
            (0, utils_1.setElementHeight)(stack.element, height);
            stack.updateSize(true);
            stack.focusActiveContentItem();
            this._maximisedStack.emit('maximised');
            this.emit('stateChanged');
        }
    }
    /** @internal */
    processMinimiseMaximisedStack() {
        if (this._maximisedStack === undefined) {
            throw new internal_error_1.AssertError('LMMMS74422');
        }
        else {
            const stack = this._maximisedStack;
            if (stack.parent === null) {
                throw new internal_error_1.UnexpectedNullError('LMMI13668');
            }
            else {
                stack.element.classList.remove("lm_maximised" /* Maximised */);
                this._maximisePlaceholder.insertAdjacentElement('afterend', stack.element);
                this._maximisePlaceholder.remove();
                this.updateRootSize(true);
                this._maximisedStack = undefined;
                stack.off('beforeItemDestroyed', this._maximisedStackBeforeDestroyedListener);
                stack.emit('minimised');
                this.emit('stateChanged');
            }
        }
    }
    /**
     * Iterates through the array of open popout windows and removes the ones
     * that are effectively closed. This is necessary due to the lack of reliably
     * listening for window.close / unload events in a cross browser compatible fashion.
     * @internal
     */
    reconcilePopoutWindows() {
        const openPopouts = [];
        for (let i = 0; i < this._openPopouts.length; i++) {
            if (this._openPopouts[i].getWindow().closed === false) {
                openPopouts.push(this._openPopouts[i]);
            }
            else {
                this.emit('windowClosed', this._openPopouts[i]);
            }
        }
        if (this._openPopouts.length !== openPopouts.length) {
            this._openPopouts = openPopouts;
            this.emit('stateChanged');
        }
    }
    /**
     * Returns a flattened array of all content items,
     * regardles of level or type
     * @internal
     */
    getAllContentItems() {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMGACI13130');
        }
        else {
            return this._groundItem.getAllContentItems();
        }
    }
    /**
     * Creates Subwindows (if there are any). Throws an error
     * if popouts are blocked.
     * @internal
     */
    createSubWindows() {
        for (let i = 0; i < this.layoutConfig.openPopouts.length; i++) {
            const popoutConfig = this.layoutConfig.openPopouts[i];
            this.createPopoutFromPopoutLayoutConfig(popoutConfig);
        }
    }
    /**
     * Debounces resize events
     * @internal
     */
    handleContainerResize() {
        if (this.resizeWithContainerAutomatically) {
            this.processResizeWithDebounce();
        }
    }
    /**
     * Debounces resize events
     * @internal
     */
    processResizeWithDebounce() {
        if (this.resizeDebounceExtendedWhenPossible) {
            this.checkClearResizeTimeout();
        }
        if (this._resizeTimeoutId === undefined) {
            this._resizeTimeoutId = setTimeout(() => {
                this._resizeTimeoutId = undefined;
                this.beginSizeInvalidation();
                this.endSizeInvalidation();
            }, this.resizeDebounceInterval);
        }
    }
    checkClearResizeTimeout() {
        if (this._resizeTimeoutId !== undefined) {
            clearTimeout(this._resizeTimeoutId);
            this._resizeTimeoutId = undefined;
        }
    }
    /**
     * Determines what element the layout will be created in
     * @internal
     */
    setContainer() {
        var _a;
        const bodyElement = document.body;
        const containerElement = (_a = this._containerElement) !== null && _a !== void 0 ? _a : bodyElement;
        if (containerElement === bodyElement) {
            this.resizeWithContainerAutomatically = true;
            const documentElement = document.documentElement;
            documentElement.style.height = '100%';
            documentElement.style.margin = '0';
            documentElement.style.padding = '0';
            documentElement.style.overflow = 'clip';
            bodyElement.style.height = '100%';
            bodyElement.style.margin = '0';
            bodyElement.style.padding = '0';
            bodyElement.style.overflow = 'clip';
        }
        this._containerElement = containerElement;
    }
    /**
     * Called when the window is closed or the user navigates away
     * from the page
     * @internal
     * @deprecated to be removed in version 3
     */
    onBeforeUnload() {
        this.destroy();
    }
    /**
     * Adjusts the number of columns to be lower to fit the screen and still maintain minItemWidth.
     * @internal
     */
    adjustColumnsResponsive() {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMACR20883');
        }
        else {
            this._firstLoad = false;
            // If there is no min width set, or not content items, do nothing.
            if (this.useResponsiveLayout() &&
                !this._updatingColumnsResponsive &&
                this._groundItem.contentItems.length > 0 &&
                this._groundItem.contentItems[0].isRow) {
                if (this._groundItem === undefined || this._width === null) {
                    throw new internal_error_1.UnexpectedUndefinedError('LMACR77412');
                }
                else {
                    // If there is only one column, do nothing.
                    const columnCount = this._groundItem.contentItems[0].contentItems.length;
                    if (columnCount <= 1) {
                        return;
                    }
                    else {
                        // If they all still fit, do nothing.
                        const minItemWidth = this.layoutConfig.dimensions.defaultMinItemWidth;
                        const totalMinWidth = columnCount * minItemWidth;
                        if (totalMinWidth <= this._width) {
                            return;
                        }
                        else {
                            // Prevent updates while it is already happening.
                            this._updatingColumnsResponsive = true;
                            // Figure out how many columns to stack, and put them all in the first stack container.
                            const finalColumnCount = Math.max(Math.floor(this._width / minItemWidth), 1);
                            const stackColumnCount = columnCount - finalColumnCount;
                            const rootContentItem = this._groundItem.contentItems[0];
                            const allStacks = this.getAllStacks();
                            if (allStacks.length === 0) {
                                throw new internal_error_1.AssertError('LMACRS77413');
                            }
                            else {
                                const firstStackContainer = allStacks[0];
                                for (let i = 0; i < stackColumnCount; i++) {
                                    // Stack from right.
                                    const column = rootContentItem.contentItems[rootContentItem.contentItems.length - 1];
                                    this.addChildContentItemsToContainer(firstStackContainer, column);
                                }
                                this._updatingColumnsResponsive = false;
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Determines if responsive layout should be used.
     *
     * @returns True if responsive layout should be used; otherwise false.
     * @internal
     */
    useResponsiveLayout() {
        const settings = this.layoutConfig.settings;
        const alwaysResponsiveMode = settings.responsiveMode === types_1.ResponsiveMode.always;
        const onLoadResponsiveModeAndFirst = settings.responsiveMode === types_1.ResponsiveMode.onload && this._firstLoad;
        return alwaysResponsiveMode || onLoadResponsiveModeAndFirst;
    }
    /**
     * Adds all children of a node to another container recursively.
     * @param container - Container to add child content items to.
     * @param node - Node to search for content items.
     * @internal
     */
    addChildContentItemsToContainer(container, node) {
        const contentItems = node.contentItems;
        if (node instanceof stack_1.Stack) {
            for (let i = 0; i < contentItems.length; i++) {
                const item = contentItems[i];
                node.removeChild(item, true);
                container.addChild(item);
            }
        }
        else {
            for (let i = 0; i < contentItems.length; i++) {
                const item = contentItems[i];
                this.addChildContentItemsToContainer(container, item);
            }
        }
    }
    /**
     * Finds all the stacks.
     * @returns The found stack containers.
     * @internal
     */
    getAllStacks() {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMFASC52778');
        }
        else {
            const stacks = [];
            this.findAllStacksRecursive(stacks, this._groundItem);
            return stacks;
        }
    }
    /** @internal */
    findFirstContentItemType(type) {
        if (this._groundItem === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('LMFFCIT82446');
        }
        else {
            return this.findFirstContentItemTypeRecursive(type, this._groundItem);
        }
    }
    /** @internal */
    findFirstContentItemTypeRecursive(type, node) {
        const contentItems = node.contentItems;
        const contentItemCount = contentItems.length;
        if (contentItemCount === 0) {
            return undefined;
        }
        else {
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                if (contentItem.type === type) {
                    return contentItem;
                }
            }
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                const foundContentItem = this.findFirstContentItemTypeRecursive(type, contentItem);
                if (foundContentItem !== undefined) {
                    return foundContentItem;
                }
            }
            return undefined;
        }
    }
    /** @internal */
    findFirstContentItemTypeByIdRecursive(type, id, node) {
        const contentItems = node.contentItems;
        const contentItemCount = contentItems.length;
        if (contentItemCount === 0) {
            return undefined;
        }
        else {
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                if (contentItem.type === type && contentItem.id === id) {
                    return contentItem;
                }
            }
            for (let i = 0; i < contentItemCount; i++) {
                const contentItem = contentItems[i];
                const foundContentItem = this.findFirstContentItemTypeByIdRecursive(type, id, contentItem);
                if (foundContentItem !== undefined) {
                    return foundContentItem;
                }
            }
            return undefined;
        }
    }
    /**
     * Finds all the stack containers.
     *
     * @param stacks - Set of containers to populate.
     * @param node - Current node to process.
     * @internal
     */
    findAllStacksRecursive(stacks, node) {
        const contentItems = node.contentItems;
        for (let i = 0; i < contentItems.length; i++) {
            const item = contentItems[i];
            if (item instanceof stack_1.Stack) {
                stacks.push(item);
            }
            else {
                if (!item.isComponent) {
                    this.findAllStacksRecursive(stacks, item);
                }
            }
        }
    }
    /** @internal */
    findFirstLocation(selectors) {
        const count = selectors.length;
        for (let i = 0; i < count; i++) {
            const selector = selectors[i];
            const location = this.findLocation(selector);
            if (location !== undefined) {
                return location;
            }
        }
        return undefined;
    }
    /** @internal */
    findLocation(selector) {
        const selectorIndex = selector.index;
        switch (selector.typeId) {
            case 0 /* FocusedItem */: {
                if (this._focusedComponentItem === undefined) {
                    return undefined;
                }
                else {
                    const parentItem = this._focusedComponentItem.parentItem;
                    const parentContentItems = parentItem.contentItems;
                    const parentContentItemCount = parentContentItems.length;
                    if (selectorIndex === undefined) {
                        return { parentItem, index: parentContentItemCount };
                    }
                    else {
                        const focusedIndex = parentContentItems.indexOf(this._focusedComponentItem);
                        const index = focusedIndex + selectorIndex;
                        if (index < 0 || index > parentContentItemCount) {
                            return undefined;
                        }
                        else {
                            return { parentItem, index };
                        }
                    }
                }
            }
            case 1 /* FocusedStack */: {
                if (this._focusedComponentItem === undefined) {
                    return undefined;
                }
                else {
                    const parentItem = this._focusedComponentItem.parentItem;
                    return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                }
            }
            case 2 /* FirstStack */: {
                const parentItem = this.findFirstContentItemType(types_1.ItemType.stack);
                if (parentItem === undefined) {
                    return undefined;
                }
                else {
                    return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                }
            }
            case 3 /* FirstRowOrColumn */: {
                let parentItem = this.findFirstContentItemType(types_1.ItemType.row);
                if (parentItem !== undefined) {
                    return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                }
                else {
                    parentItem = this.findFirstContentItemType(types_1.ItemType.column);
                    if (parentItem !== undefined) {
                        return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                    }
                    else {
                        return undefined;
                    }
                }
            }
            case 4 /* FirstRow */: {
                const parentItem = this.findFirstContentItemType(types_1.ItemType.row);
                if (parentItem === undefined) {
                    return undefined;
                }
                else {
                    return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                }
            }
            case 5 /* FirstColumn */: {
                const parentItem = this.findFirstContentItemType(types_1.ItemType.column);
                if (parentItem === undefined) {
                    return undefined;
                }
                else {
                    return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                }
            }
            case 6 /* Empty */: {
                if (this._groundItem === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('LMFLRIF18244');
                }
                else {
                    if (this.rootItem !== undefined) {
                        return undefined;
                    }
                    else {
                        if (selectorIndex === undefined || selectorIndex === 0)
                            return { parentItem: this._groundItem, index: 0 };
                        else {
                            return undefined;
                        }
                    }
                }
            }
            case 7 /* Root */: {
                if (this._groundItem === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('LMFLF18244');
                }
                else {
                    const groundContentItems = this._groundItem.contentItems;
                    if (groundContentItems.length === 0) {
                        if (selectorIndex === undefined || selectorIndex === 0)
                            return { parentItem: this._groundItem, index: 0 };
                        else {
                            return undefined;
                        }
                    }
                    else {
                        const parentItem = groundContentItems[0];
                        return this.tryCreateLocationFromParentItem(parentItem, selectorIndex);
                    }
                }
            }
        }
    }
    /** @internal */
    tryCreateLocationFromParentItem(parentItem, selectorIndex) {
        const parentContentItems = parentItem.contentItems;
        const parentContentItemCount = parentContentItems.length;
        if (selectorIndex === undefined) {
            return { parentItem, index: parentContentItemCount };
        }
        else {
            if (selectorIndex < 0 || selectorIndex > parentContentItemCount) {
                return undefined;
            }
            else {
                return { parentItem, index: selectorIndex };
            }
        }
    }
}
exports.LayoutManager = LayoutManager;
/** @public */
(function (LayoutManager) {
    /** @internal */
    function createMaximisePlaceElement(document) {
        const element = document.createElement('div');
        element.classList.add("lm_maximise_place" /* MaximisePlace */);
        return element;
    }
    LayoutManager.createMaximisePlaceElement = createMaximisePlaceElement;
    /** @internal */
    function createTabDropPlaceholderElement(document) {
        const element = document.createElement('div');
        element.classList.add("lm_drop_tab_placeholder" /* DropTabPlaceholder */);
        return element;
    }
    LayoutManager.createTabDropPlaceholderElement = createTabDropPlaceholderElement;
    /**
     * Default LocationSelectors array used if none is specified.  Will always find a location.
     * @public
     */
    LayoutManager.defaultLocationSelectors = [
        { typeId: 1 /* FocusedStack */, index: undefined },
        { typeId: 2 /* FirstStack */, index: undefined },
        { typeId: 3 /* FirstRowOrColumn */, index: undefined },
        { typeId: 7 /* Root */, index: undefined },
    ];
    /**
     * LocationSelectors to try to get location next to existing focused item
     * @public
     */
    LayoutManager.afterFocusedItemIfPossibleLocationSelectors = [
        { typeId: 0 /* FocusedItem */, index: 1 },
        { typeId: 2 /* FirstStack */, index: undefined },
        { typeId: 3 /* FirstRowOrColumn */, index: undefined },
        { typeId: 7 /* Root */, index: undefined },
    ];
})(LayoutManager = exports.LayoutManager || (exports.LayoutManager = {}));

},{"./config/config":3,"./config/resolved-config":4,"./controls/browser-popout":6,"./controls/drag-proxy":7,"./controls/drag-source":8,"./controls/drop-target-indicator":9,"./controls/transition-indicator":15,"./errors/external-error":16,"./errors/internal-error":17,"./items/component-item":19,"./items/content-item":21,"./items/ground-item":22,"./items/row-or-column":23,"./items/stack":24,"./utils/config-minifier":26,"./utils/event-emitter":28,"./utils/event-hub":29,"./utils/i18n-strings":30,"./utils/types":32,"./utils/utils":33}],26:[function(require,module,exports){
"use strict";
/**
 * Minifies and unminifies configs by replacing frequent keys
 * and values with one letter substitutes. Config options must
 * retain array position/index, add new options at the end.
 * @internal
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigMinifier = void 0;
var ConfigMinifier;
(function (ConfigMinifier) {
    const keys = [
        'settings',
        'hasHeaders',
        'constrainDragToContainer',
        'selectionEnabled',
        'dimensions',
        'borderWidth',
        'minItemHeight',
        'minItemWidth',
        'headerHeight',
        'dragProxyWidth',
        'dragProxyHeight',
        'labels',
        'close',
        'maximise',
        'minimise',
        'popout',
        'content',
        'componentType',
        'componentState',
        'id',
        'width',
        'type',
        'height',
        'isClosable',
        'title',
        'popoutWholeStack',
        'openPopouts',
        'parentId',
        'activeItemIndex',
        'reorderEnabled',
        'borderGrabWidth',
        //Maximum 36 entries, do not cross this line!
    ];
    const values = [
        true,
        false,
        'row',
        'column',
        'stack',
        'component',
        'close',
        'maximise',
        'minimise',
        'open in new window'
    ];
    function checkInitialise() {
        if (keys.length > 36) {
            throw new Error('Too many keys in config minifier map');
        }
    }
    ConfigMinifier.checkInitialise = checkInitialise;
    function translateObject(from, minify) {
        const to = {};
        for (const key in from) {
            if (from.hasOwnProperty(key)) { // In case something has extended Object prototypes
                let translatedKey;
                if (minify) {
                    translatedKey = minifyKey(key);
                }
                else {
                    translatedKey = unminifyKey(key);
                }
                const fromValue = from[key];
                to[translatedKey] = translateValue(fromValue, minify);
            }
        }
        return to;
    }
    ConfigMinifier.translateObject = translateObject;
    function translateArray(from, minify) {
        const length = from.length;
        const to = new Array(length);
        for (let i = 0; i < length; i++) {
            // In original code, array indices were numbers and not translated
            const fromValue = from[i];
            to[i] = translateValue(fromValue, minify);
        }
        return to;
    }
    function translateValue(from, minify) {
        if (typeof from === 'object') {
            if (from === null) {
                return null;
            }
            else {
                if (Array.isArray(from)) {
                    return translateArray(from, minify);
                }
                else {
                    return translateObject(from, minify);
                }
            }
        }
        else {
            if (minify) {
                return minifyValue(from);
            }
            else {
                return unminifyValue(from);
            }
        }
    }
    function minifyKey(value) {
        /**
         * If a value actually is a single character, prefix it
         * with ___ to avoid mistaking it for a minification code
         */
        if (typeof value === 'string' && value.length === 1) {
            return '___' + value;
        }
        const index = indexOfKey(value);
        /**
         * value not found in the dictionary, return it unmodified
         */
        if (index === -1) {
            return value;
            /**
             * value found in dictionary, return its base36 counterpart
             */
        }
        else {
            return index.toString(36);
        }
    }
    function unminifyKey(key) {
        /**
         * value is a single character. Assume that it's a translation
         * and return the original value from the dictionary
         */
        if (key.length === 1) {
            return keys[parseInt(key, 36)];
        }
        /**
         * value originally was a single character and was prefixed with ___
         * to avoid mistaking it for a translation. Remove the prefix
         * and return the original character
         */
        if (key.substr(0, 3) === '___') {
            return key[3];
        }
        /**
         * value was not minified
         */
        return key;
    }
    function minifyValue(value) {
        /**
         * If a value actually is a single character, prefix it
         * with ___ to avoid mistaking it for a minification code
         */
        if (typeof value === 'string' && value.length === 1) {
            return '___' + value;
        }
        const index = indexOfValue(value);
        /**
         * value not found in the dictionary, return it unmodified
         */
        if (index === -1) {
            return value;
            /**
             * value found in dictionary, return its base36 counterpart
             */
        }
        else {
            return index.toString(36);
        }
    }
    function unminifyValue(value) {
        /**
         * value is a single character. Assume that it's a translation
         * and return the original value from the dictionary
         */
        if (typeof value === 'string' && value.length === 1) {
            return values[parseInt(value, 36)];
        }
        /**
         * value originally was a single character and was prefixed with ___
         * to avoid mistaking it for a translation. Remove the prefix
         * and return the original character
         */
        if (typeof value === 'string' && value.substr(0, 3) === '___') {
            return value[3];
        }
        /**
         * value was not minified
         */
        return value;
    }
    function indexOfKey(key) {
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                return i;
            }
        }
        return -1;
    }
    function indexOfValue(value) {
        for (let i = 0; i < values.length; i++) {
            if (values[i] === value) {
                return i;
            }
        }
        return -1;
    }
})(ConfigMinifier = exports.ConfigMinifier || (exports.ConfigMinifier = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragListener = void 0;
const event_emitter_1 = require("./event-emitter");
/** @internal */
class DragListener extends event_emitter_1.EventEmitter {
    constructor(_eElement, extraAllowableChildTargets) {
        super();
        this._eElement = _eElement;
        this._pointerTracking = false;
        this._pointerDownEventListener = (ev) => this.onPointerDown(ev);
        this._pointerMoveEventListener = (ev) => this.onPointerMove(ev);
        this._pointerUpEventListener = (ev) => this.onPointerUp(ev);
        this._timeout = undefined;
        this._allowableTargets = [_eElement, ...extraAllowableChildTargets];
        this._oDocument = document;
        this._eBody = document.body;
        /**
         * The delay after which to start the drag in milliseconds
         * Do NOT make too short (previous value of 200 was not long enough for my touchpad)
         * Should generally rely on the mouse move to start drag.  Not this delay.
         */
        this._nDelay = 1800;
        /**
         * The distance the mouse needs to be moved to qualify as a drag
         * Previous comment: works better with delay only
         * ???
         * Probably somehow needs tuning for different devices
         */
        this._nDistance = 10;
        this._nX = 0;
        this._nY = 0;
        this._nOriginalX = 0;
        this._nOriginalY = 0;
        this._dragging = false;
        this._eElement.addEventListener('pointerdown', this._pointerDownEventListener, { passive: true });
    }
    destroy() {
        this.checkRemovePointerTrackingEventListeners();
        this._eElement.removeEventListener('pointerdown', this._pointerDownEventListener);
    }
    cancelDrag() {
        this.processDragStop(undefined);
    }
    onPointerDown(oEvent) {
        if (this._allowableTargets.includes(oEvent.target) && oEvent.isPrimary) {
            const coordinates = this.getPointerCoordinates(oEvent);
            this.processPointerDown(coordinates);
        }
    }
    processPointerDown(coordinates) {
        this._nOriginalX = coordinates.x;
        this._nOriginalY = coordinates.y;
        this._oDocument.addEventListener('pointermove', this._pointerMoveEventListener);
        this._oDocument.addEventListener('pointerup', this._pointerUpEventListener, { passive: true });
        this._pointerTracking = true;
        this._timeout = setTimeout(() => {
            try {
                this.startDrag();
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }, this._nDelay);
    }
    onPointerMove(oEvent) {
        if (this._pointerTracking) {
            this.processDragMove(oEvent);
            oEvent.preventDefault();
        }
    }
    processDragMove(dragEvent) {
        this._nX = dragEvent.pageX - this._nOriginalX;
        this._nY = dragEvent.pageY - this._nOriginalY;
        if (this._dragging === false) {
            if (Math.abs(this._nX) > this._nDistance ||
                Math.abs(this._nY) > this._nDistance) {
                this.startDrag();
            }
        }
        if (this._dragging) {
            this.emit('drag', this._nX, this._nY, dragEvent);
        }
    }
    onPointerUp(oEvent) {
        this.processDragStop(oEvent);
    }
    processDragStop(dragEvent) {
        var _a;
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
        this.checkRemovePointerTrackingEventListeners();
        if (this._dragging === true) {
            this._eBody.classList.remove("lm_dragging" /* Dragging */);
            this._eElement.classList.remove("lm_dragging" /* Dragging */);
            (_a = this._oDocument.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.style.setProperty('pointer-events', '');
            this._dragging = false;
            this.emit('dragStop', dragEvent);
        }
    }
    checkRemovePointerTrackingEventListeners() {
        if (this._pointerTracking) {
            this._oDocument.removeEventListener('pointermove', this._pointerMoveEventListener);
            this._oDocument.removeEventListener('pointerup', this._pointerUpEventListener);
            this._pointerTracking = false;
        }
    }
    startDrag() {
        var _a;
        if (this._timeout !== undefined) {
            clearTimeout(this._timeout);
            this._timeout = undefined;
        }
        this._dragging = true;
        this._eBody.classList.add("lm_dragging" /* Dragging */);
        this._eElement.classList.add("lm_dragging" /* Dragging */);
        (_a = this._oDocument.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.style.setProperty('pointer-events', 'none');
        this.emit('dragStart', this._nOriginalX, this._nOriginalY);
    }
    getPointerCoordinates(event) {
        const result = {
            x: event.pageX,
            y: event.pageY
        };
        return result;
    }
}
exports.DragListener = DragListener;

},{"./event-emitter":28}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
/**
 * A generic and very fast EventEmitter implementation. On top of emitting the actual event it emits an
 * {@link (EventEmitter:namespace).ALL_EVENT} event for every event triggered. This allows to hook into it and proxy events forwards
 * @public
 */
class EventEmitter {
    constructor() {
        /** @internal */
        this._allEventSubscriptions = [];
        /** @internal */
        this._subscriptionsMap = new Map();
        /**
         * Alias for off
         */
        this.unbind = this.removeEventListener;
        /**
         * Alias for emit
         */
        this.trigger = this.emit;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tryBubbleEvent(name, args) {
        // overridden by ContentItem
    }
    /**
     * Emit an event and notify listeners
     *
     * @param eventName - The name of the event
     * @param args - Additional arguments that will be passed to the listener
     */
    emit(eventName, ...args) {
        let subcriptions = this._subscriptionsMap.get(eventName);
        if (subcriptions !== undefined) {
            subcriptions = subcriptions.slice();
            for (let i = 0; i < subcriptions.length; i++) {
                const subscription = subcriptions[i];
                subscription(...args);
            }
        }
        this.emitAllEvent(eventName, args);
        this.tryBubbleEvent(eventName, args);
    }
    /** @internal */
    emitUnknown(eventName, ...args) {
        let subs = this._subscriptionsMap.get(eventName);
        if (subs !== undefined) {
            subs = subs.slice();
            for (let i = 0; i < subs.length; i++) {
                subs[i](...args);
            }
        }
        this.emitAllEvent(eventName, args);
        this.tryBubbleEvent(eventName, args);
    }
    /* @internal **/
    emitBaseBubblingEvent(eventName) {
        const event = new EventEmitter.BubblingEvent(eventName, this);
        this.emitUnknown(eventName, event);
    }
    /** @internal */
    emitUnknownBubblingEvent(eventName) {
        const event = new EventEmitter.BubblingEvent(eventName, this);
        this.emitUnknown(eventName, event);
    }
    /**
     * Removes a listener for an event.
     * @param eventName - The name of the event
     * @param callback - The previously registered callback method (optional)
     */
    removeEventListener(eventName, callback) {
        const unknownCallback = callback;
        this.removeUnknownEventListener(eventName, unknownCallback);
    }
    off(eventName, callback) {
        this.removeEventListener(eventName, callback);
    }
    /**
     * Listen for events
     *
     * @param eventName - The name of the event to listen to
     * @param callback - The callback to execute when the event occurs
     */
    addEventListener(eventName, callback) {
        const unknownCallback = callback;
        this.addUnknownEventListener(eventName, unknownCallback);
    }
    on(eventName, callback) {
        this.addEventListener(eventName, callback);
    }
    /** @internal */
    addUnknownEventListener(eventName, callback) {
        if (eventName === EventEmitter.ALL_EVENT) {
            this._allEventSubscriptions.push(callback);
        }
        else {
            let subscriptions = this._subscriptionsMap.get(eventName);
            if (subscriptions !== undefined) {
                subscriptions.push(callback);
            }
            else {
                subscriptions = [callback];
                this._subscriptionsMap.set(eventName, subscriptions);
            }
        }
    }
    /** @internal */
    removeUnknownEventListener(eventName, callback) {
        if (eventName === EventEmitter.ALL_EVENT) {
            this.removeSubscription(eventName, this._allEventSubscriptions, callback);
        }
        else {
            const subscriptions = this._subscriptionsMap.get(eventName);
            if (subscriptions === undefined) {
                throw new Error('No subscribtions to unsubscribe for event ' + eventName);
            }
            else {
                this.removeSubscription(eventName, subscriptions, callback);
            }
        }
    }
    /** @internal */
    removeSubscription(eventName, subscriptions, callback) {
        const idx = subscriptions.indexOf(callback);
        if (idx < 0) {
            throw new Error('Nothing to unbind for ' + eventName);
        }
        else {
            subscriptions.splice(idx, 1);
        }
    }
    /** @internal */
    emitAllEvent(eventName, args) {
        const allEventSubscriptionsCount = this._allEventSubscriptions.length;
        if (allEventSubscriptionsCount > 0) {
            const unknownArgs = args.slice();
            unknownArgs.unshift(eventName);
            const allEventSubcriptions = this._allEventSubscriptions.slice();
            for (let i = 0; i < allEventSubscriptionsCount; i++) {
                allEventSubcriptions[i](...unknownArgs);
            }
        }
    }
}
exports.EventEmitter = EventEmitter;
/** @public */
(function (EventEmitter) {
    /**
     * The name of the event that's triggered for every event
     */
    EventEmitter.ALL_EVENT = '__all';
    EventEmitter.headerClickEventName = 'stackHeaderClick';
    EventEmitter.headerTouchStartEventName = 'stackHeaderTouchStart';
    class BubblingEvent {
        /** @internal */
        constructor(
        /** @internal */
        _name, 
        /** @internal */
        _target) {
            this._name = _name;
            this._target = _target;
            /** @internal */
            this._isPropagationStopped = false;
        }
        get name() { return this._name; }
        get target() { return this._target; }
        /** @deprecated Use {@link (EventEmitter:namespace).(BubblingEvent:class).target} instead */
        get origin() { return this._target; }
        get isPropagationStopped() { return this._isPropagationStopped; }
        stopPropagation() {
            this._isPropagationStopped = true;
        }
    }
    EventEmitter.BubblingEvent = BubblingEvent;
    class ClickBubblingEvent extends BubblingEvent {
        /** @internal */
        constructor(name, target, 
        /** @internal */
        _mouseEvent) {
            super(name, target);
            this._mouseEvent = _mouseEvent;
        }
        get mouseEvent() { return this._mouseEvent; }
    }
    EventEmitter.ClickBubblingEvent = ClickBubblingEvent;
    class TouchStartBubblingEvent extends BubblingEvent {
        /** @internal */
        constructor(name, target, 
        /** @internal */
        _touchEvent) {
            super(name, target);
            this._touchEvent = _touchEvent;
        }
        get touchEvent() { return this._touchEvent; }
    }
    EventEmitter.TouchStartBubblingEvent = TouchStartBubblingEvent;
})(EventEmitter = exports.EventEmitter || (exports.EventEmitter = {}));

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHub = void 0;
const internal_error_1 = require("../errors/internal-error");
const event_emitter_1 = require("./event-emitter");
/**
 * An EventEmitter singleton that propagates events
 * across multiple windows. This is a little bit trickier since
 * windows are allowed to open childWindows in their own right.
 *
 * This means that we deal with a tree of windows. Therefore, we do the event propagation in two phases:
 *
 * - Propagate events from this layout to the parent layout
 *   - Repeat until the event arrived at the root layout
 * - Propagate events to this layout and to all children
 *   - Repeat until all layouts got the event
 *
 * **WARNING**: Only userBroadcast events are propagated between windows.
 * This means the you have to take care of propagating state changes between windows yourself.
 *
 * @public
 */
class EventHub extends event_emitter_1.EventEmitter {
    /**
     * Creates a new EventHub instance
     * @param _layoutManager - the layout manager to synchronize between the windows
     * @internal
     */
    constructor(
    /** @internal */
    _layoutManager) {
        super();
        this._layoutManager = _layoutManager;
        /** @internal */
        this._childEventListener = (childEvent) => this.onEventFromChild(childEvent);
        globalThis.addEventListener(EventHub.ChildEventName, this._childEventListener, { passive: true });
    }
    /**
     * Emit an event and notify listeners
     *
     * @param eventName - The name of the event
     * @param args - Additional arguments that will be passed to the listener
     * @public
     */
    emit(eventName, ...args) {
        if (eventName === 'userBroadcast') {
            // Explicitly redirect the user broadcast to our overridden method.
            this.emitUserBroadcast(...args);
        }
        else {
            super.emit(eventName, ...args);
        }
    }
    /**
     * Broadcasts a message to all other currently opened windows.
     * @public
     */
    emitUserBroadcast(...args) {
        // Step 1: Bubble up the event
        this.handleUserBroadcastEvent('userBroadcast', args);
    }
    /**
     * Destroys the EventHub
     * @internal
     */
    destroy() {
        globalThis.removeEventListener(EventHub.ChildEventName, this._childEventListener);
    }
    /**
     * Internal processor to process local events.
     * @internal
     */
    handleUserBroadcastEvent(eventName, args) {
        if (this._layoutManager.isSubWindow) {
            // We are a sub window and received an event from one of our children.
            // So propagate it to the Root.
            this.propagateToParent(eventName, args);
        }
        else {
            // We are the root window, propagate it to the subtree below us.
            this.propagateToThisAndSubtree(eventName, args);
        }
    }
    /**
     * Callback for child events raised on the window
     * @internal
     */
    onEventFromChild(event) {
        const detail = event.detail;
        this.handleUserBroadcastEvent(detail.eventName, detail.args);
    }
    /**
     * Propagates the event to the parent by emitting
     * it on the parent's DOM window
     * @internal
     */
    propagateToParent(eventName, args) {
        const detail = {
            layoutManager: this._layoutManager,
            eventName,
            args: args,
        };
        const eventInit = {
            bubbles: true,
            cancelable: true,
            detail,
        };
        const event = new CustomEvent(EventHub.ChildEventName, eventInit);
        const opener = globalThis.opener;
        if (opener === null) {
            throw new internal_error_1.UnexpectedNullError('EHPTP15778');
        }
        opener.dispatchEvent(event);
    }
    /**
     * Propagate events to the whole subtree under this event hub.
     * @internal
     */
    propagateToThisAndSubtree(eventName, args) {
        this.emitUnknown(eventName, ...args);
        for (let i = 0; i < this._layoutManager.openPopouts.length; i++) {
            const childGl = this._layoutManager.openPopouts[i].getGlInstance();
            if (childGl) {
                childGl.eventHub.propagateToThisAndSubtree(eventName, args);
            }
        }
    }
}
exports.EventHub = EventHub;
/** @public */
(function (EventHub) {
    /** @internal */
    EventHub.ChildEventName = 'gl_child_event';
})(EventHub = exports.EventHub || (exports.EventHub = {}));

},{"../errors/internal-error":17,"./event-emitter":28}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nStrings = exports.I18nStrings = void 0;
const internal_error_1 = require("../errors/internal-error");
/** @public */
var I18nStrings;
(function (I18nStrings) {
    /** @internal */
    let initialised = false;
    /** @internal */
    const infosObject = {
        PopoutCannotBeCreatedWithGroundItemConfig: {
            id: 0 /* PopoutCannotBeCreatedWithGroundItemConfig */,
            default: 'Popout cannot be created with ground ItemConfig'
        },
        PleaseRegisterAConstructorFunction: {
            id: 1 /* PleaseRegisterAConstructorFunction */,
            default: 'Please register a constructor function'
        },
        ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned: {
            id: 2 /* ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned */,
            default: 'Component type not registered and BindComponentEvent handler not assigned',
        },
        ComponentIsAlreadyRegistered: {
            id: 3 /* ComponentIsAlreadyRegistered */,
            default: 'Component is already registered',
        },
        ComponentIsNotVirtuable: {
            id: 4 /* ComponentIsNotVirtuable */,
            default: 'Component is not virtuable. Requires rootHtmlElement field/getter',
        },
        VirtualComponentDoesNotHaveRootHtmlElement: {
            id: 5 /* VirtualComponentDoesNotHaveRootHtmlElement */,
            default: 'Virtual component does not have getter "rootHtmlElement"',
        },
        ItemConfigIsNotTypeComponent: {
            id: 6 /* ItemConfigIsNotTypeComponent */,
            default: 'ItemConfig is not of type component',
        },
        InvalidNumberPartInSizeString: {
            id: 7 /* InvalidNumberPartInSizeString */,
            default: 'Invalid number part in size string',
        },
        UnknownUnitInSizeString: {
            id: 8 /* UnknownUnitInSizeString */,
            default: 'Unknown unit in size string',
        },
        UnsupportedUnitInSizeString: {
            id: 9 /* UnsupportedUnitInSizeString */,
            default: 'Unsupported unit in size string',
        },
    };
    I18nStrings.idCount = Object.keys(infosObject).length;
    /** @internal */
    const infos = Object.values(infosObject);
    function checkInitialise() {
        if (!initialised) {
            for (let i = 0; i < I18nStrings.idCount; i++) {
                const info = infos[i];
                if (info.id !== i) {
                    throw new internal_error_1.AssertError('INSI00110', `${i}: ${info.id}`);
                }
                else {
                    exports.i18nStrings[i] = info.default;
                }
            }
        }
        initialised = true;
    }
    I18nStrings.checkInitialise = checkInitialise;
})(I18nStrings = exports.I18nStrings || (exports.I18nStrings = {}));
/** @public */
exports.i18nStrings = new Array(I18nStrings.idCount);

},{"../errors/internal-error":17}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleConstants = void 0;
/** @public */
var StyleConstants;
(function (StyleConstants) {
    StyleConstants.defaultComponentBaseZIndex = 'auto';
    StyleConstants.defaultComponentDragZIndex = '32';
    StyleConstants.defaultComponentStackMaximisedZIndex = '41';
})(StyleConstants = exports.StyleConstants || (exports.StyleConstants = {}));

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeUnitEnum = exports.ResponsiveMode = exports.ItemType = exports.JsonValue = exports.LogicalZIndexToDefaultMap = exports.LogicalZIndex = exports.Side = exports.WidthOrHeightPropertyName = void 0;
const internal_error_1 = require("../errors/internal-error");
const style_constants_1 = require("./style-constants");
/** @internal */
var WidthOrHeightPropertyName;
(function (WidthOrHeightPropertyName) {
    WidthOrHeightPropertyName.width = 'width';
    WidthOrHeightPropertyName.height = 'height';
})(WidthOrHeightPropertyName = exports.WidthOrHeightPropertyName || (exports.WidthOrHeightPropertyName = {}));
/** @public */
var Side;
(function (Side) {
    Side.top = 'top';
    Side.left = 'left';
    Side.right = 'right';
    Side.bottom = 'bottom';
})(Side = exports.Side || (exports.Side = {}));
/** @public */
var LogicalZIndex;
(function (LogicalZIndex) {
    LogicalZIndex.base = 'base';
    LogicalZIndex.drag = 'drag';
    LogicalZIndex.stackMaximised = 'stackMaximised';
})(LogicalZIndex = exports.LogicalZIndex || (exports.LogicalZIndex = {}));
/** @public */
exports.LogicalZIndexToDefaultMap = {
    base: style_constants_1.StyleConstants.defaultComponentBaseZIndex,
    drag: style_constants_1.StyleConstants.defaultComponentDragZIndex,
    stackMaximised: style_constants_1.StyleConstants.defaultComponentStackMaximisedZIndex,
};
/** @public */
var JsonValue;
(function (JsonValue) {
    function isJson(value) {
        return isJsonObject(value);
    }
    JsonValue.isJson = isJson;
    // eslint-disable-next-line @typescript-eslint/ban-types
    function isJsonObject(value) {
        return !Array.isArray(value) && value !== null && typeof value === 'object';
    }
    JsonValue.isJsonObject = isJsonObject;
})(JsonValue = exports.JsonValue || (exports.JsonValue = {}));
/** @public */
var ItemType;
(function (ItemType) {
    ItemType.ground = 'ground';
    ItemType.row = 'row';
    ItemType.column = 'column';
    ItemType.stack = 'stack';
    ItemType.component = 'component';
})(ItemType = exports.ItemType || (exports.ItemType = {}));
/** @public */
var ResponsiveMode;
(function (ResponsiveMode) {
    ResponsiveMode.none = 'none';
    ResponsiveMode.always = 'always';
    ResponsiveMode.onload = 'onload';
})(ResponsiveMode = exports.ResponsiveMode || (exports.ResponsiveMode = {}));
/** @public */
var SizeUnitEnum;
(function (SizeUnitEnum) {
    SizeUnitEnum["Pixel"] = "px";
    SizeUnitEnum["Percent"] = "%";
    SizeUnitEnum["Fractional"] = "fr";
    SizeUnitEnum["Em"] = "em";
})(SizeUnitEnum = exports.SizeUnitEnum || (exports.SizeUnitEnum = {}));
/** @public */
(function (SizeUnitEnum) {
    function tryParse(value) {
        switch (value) {
            case SizeUnitEnum.Pixel: return SizeUnitEnum.Pixel;
            case SizeUnitEnum.Percent: return SizeUnitEnum.Percent;
            case SizeUnitEnum.Fractional: return SizeUnitEnum.Fractional;
            case SizeUnitEnum.Em: return SizeUnitEnum.Em;
            default: return undefined;
        }
    }
    SizeUnitEnum.tryParse = tryParse;
    function format(value) {
        switch (value) {
            case SizeUnitEnum.Pixel: return SizeUnitEnum.Pixel;
            case SizeUnitEnum.Percent: return SizeUnitEnum.Percent;
            case SizeUnitEnum.Fractional: return SizeUnitEnum.Fractional;
            case SizeUnitEnum.Em: return SizeUnitEnum.Em;
            default:
                throw new internal_error_1.UnreachableCaseError('SUEF44998', value);
        }
    }
    SizeUnitEnum.format = format;
})(SizeUnitEnum = exports.SizeUnitEnum || (exports.SizeUnitEnum = {}));

},{"../errors/internal-error":17,"./style-constants":31}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.getUniqueId = exports.removeFromArray = exports.deepExtendValue = exports.deepExtend = exports.extend = exports.ensureElementPositionAbsolute = exports.setElementDisplayVisibility = exports.getElementWidthAndHeight = exports.setElementHeight = exports.getElementHeight = exports.setElementWidth = exports.getElementWidth = exports.isDigit = exports.splitStringAtFirstNonNumericChar = exports.pixelsToNumber = exports.numberToPixels = void 0;
/** @internal */
function numberToPixels(value) {
    return value.toString(10) + 'px';
}
exports.numberToPixels = numberToPixels;
/** @internal */
function pixelsToNumber(value) {
    const numberStr = value.replace("px", "");
    return parseFloat(numberStr);
}
exports.pixelsToNumber = pixelsToNumber;
/** @internal */
function splitStringAtFirstNonNumericChar(value) {
    value = value.trimStart();
    const length = value.length;
    if (length === 0) {
        return { numericPart: '', firstNonNumericCharPart: '' };
    }
    else {
        let firstNonDigitPartIndex = length;
        let gotDecimalPoint = false;
        for (let i = 0; i < length; i++) {
            const char = value[i];
            if (!isDigit(char)) {
                if (char !== '.') {
                    firstNonDigitPartIndex = i;
                    break;
                }
                else {
                    if (gotDecimalPoint) {
                        firstNonDigitPartIndex = i;
                        break;
                    }
                    else {
                        gotDecimalPoint = true;
                    }
                }
            }
        }
        const digitsPart = value.substring(0, firstNonDigitPartIndex);
        const firstNonDigitPart = value.substring(firstNonDigitPartIndex).trim();
        return { numericPart: digitsPart, firstNonNumericCharPart: firstNonDigitPart };
    }
}
exports.splitStringAtFirstNonNumericChar = splitStringAtFirstNonNumericChar;
/** @internal */
function isDigit(char) {
    return char >= '0' && char <= '9';
}
exports.isDigit = isDigit;
/** @internal */
function getElementWidth(element) {
    return element.offsetWidth;
}
exports.getElementWidth = getElementWidth;
/** @internal */
function setElementWidth(element, width) {
    const widthAsPixels = numberToPixels(width);
    element.style.width = widthAsPixels;
}
exports.setElementWidth = setElementWidth;
/** @internal */
function getElementHeight(element) {
    return element.offsetHeight;
}
exports.getElementHeight = getElementHeight;
/** @internal */
function setElementHeight(element, height) {
    const heightAsPixels = numberToPixels(height);
    element.style.height = heightAsPixels;
}
exports.setElementHeight = setElementHeight;
/** @internal */
function getElementWidthAndHeight(element) {
    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
}
exports.getElementWidthAndHeight = getElementWidthAndHeight;
/** @internal */
function setElementDisplayVisibility(element, visible) {
    if (visible) {
        element.style.display = '';
    }
    else {
        element.style.display = 'none';
    }
}
exports.setElementDisplayVisibility = setElementDisplayVisibility;
/** @internal */
function ensureElementPositionAbsolute(element) {
    const absolutePosition = 'absolute';
    if (element.style.position !== absolutePosition) {
        element.style.position = absolutePosition;
    }
}
exports.ensureElementPositionAbsolute = ensureElementPositionAbsolute;
/**
 * Replacement for JQuery $.extend(target, obj)
 * @internal
*/
function extend(target, obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            target[key] = obj[key];
        }
    }
    return target;
}
exports.extend = extend;
/**
 * Replacement for JQuery $.extend(true, target, obj)
 * @internal
*/
function deepExtend(target, obj) {
    if (obj !== undefined) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const existingTarget = target[key];
                target[key] = deepExtendValue(existingTarget, value);
            }
        }
    }
    return target;
}
exports.deepExtend = deepExtend;
/** @internal */
function deepExtendValue(existingTarget, value) {
    if (typeof value !== 'object') {
        return value;
    }
    else {
        if (Array.isArray(value)) {
            const length = value.length;
            const targetArray = new Array(length);
            for (let i = 0; i < length; i++) {
                const element = value[i];
                targetArray[i] = deepExtendValue({}, element);
            }
            return targetArray;
        }
        else {
            if (value === null) {
                return null;
            }
            else {
                const valueObj = value;
                if (existingTarget === undefined) {
                    return deepExtend({}, valueObj); // overwrite
                }
                else {
                    if (typeof existingTarget !== "object") {
                        return deepExtend({}, valueObj); // overwrite
                    }
                    else {
                        if (Array.isArray(existingTarget)) {
                            return deepExtend({}, valueObj); // overwrite
                        }
                        else {
                            if (existingTarget === null) {
                                return deepExtend({}, valueObj); // overwrite
                            }
                            else {
                                const existingTargetObj = existingTarget;
                                return deepExtend(existingTargetObj, valueObj); // merge
                            }
                        }
                    }
                }
            }
        }
    }
}
exports.deepExtendValue = deepExtendValue;
/** @internal */
function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index === -1) {
        throw new Error('Can\'t remove item from array. Item is not in the array');
    }
    array.splice(index, 1);
}
exports.removeFromArray = removeFromArray;
/** @internal */
function getUniqueId() {
    return (Math.random() * 1000000000000000)
        .toString(36)
        .replace('.', '');
}
exports.getUniqueId = getUniqueId;
/** @internal */
function getErrorMessage(e) {
    if (e instanceof Error) {
        return e.message;
    }
    else {
        if (typeof e === 'string') {
            return e;
        }
        else {
            return 'Unknown Error';
        }
    }
}
exports.getErrorMessage = getErrorMessage;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualLayout = void 0;
const config_1 = require("./config/config");
const resolved_config_1 = require("./config/resolved-config");
const external_error_1 = require("./errors/external-error");
const internal_error_1 = require("./errors/internal-error");
const layout_manager_1 = require("./layout-manager");
const i18n_strings_1 = require("./utils/i18n-strings");
/** @public */
class VirtualLayout extends layout_manager_1.LayoutManager {
    /** @internal */
    constructor(configOrOptionalContainer, containerOrBindComponentEventHandler, unbindComponentEventHandler, skipInit) {
        super(VirtualLayout.createLayoutManagerConstructorParameters(configOrOptionalContainer, containerOrBindComponentEventHandler));
        /** @internal @deprecated use while constructor is not determinate */
        this._bindComponentEventHanlderPassedInConstructor = false; // remove when constructor is determinate
        /** @internal  @deprecated use while constructor is not determinate */
        this._creationTimeoutPassed = false; // remove when constructor is determinate
        if (containerOrBindComponentEventHandler !== undefined) {
            if (typeof containerOrBindComponentEventHandler === 'function') {
                this.bindComponentEvent = containerOrBindComponentEventHandler;
                this._bindComponentEventHanlderPassedInConstructor = true;
                if (unbindComponentEventHandler !== undefined) {
                    this.unbindComponentEvent = unbindComponentEventHandler;
                }
            }
        }
        if (!this._bindComponentEventHanlderPassedInConstructor) {
            // backward compatibility
            if (this.isSubWindow) {
                // document.body.style.visibility = 'hidden';
                // Set up layoutConfig since constructor is not determinate and may exit early. Other functions may need
                // this.layoutConfig. this.layoutConfig is again calculated in the same way when init() completes.
                // Remove this when constructor is determinate.
                if (this._constructorOrSubWindowLayoutConfig === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('VLC98823');
                }
                else {
                    const resolvedLayoutConfig = config_1.LayoutConfig.resolve(this._constructorOrSubWindowLayoutConfig);
                    // remove root from layoutConfig
                    this.layoutConfig = Object.assign(Object.assign({}, resolvedLayoutConfig), { root: undefined });
                }
            }
        }
        if (skipInit !== true) {
            if (!this.deprecatedConstructor) {
                this.init();
            }
        }
    }
    destroy() {
        this.bindComponentEvent = undefined;
        this.unbindComponentEvent = undefined;
        super.destroy();
    }
    /**
     * Creates the actual layout. Must be called after all initial components
     * are registered. Recurses through the configuration and sets up
     * the item tree.
     *
     * If called before the document is ready it adds itself as a listener
     * to the document.ready event
     * @deprecated LayoutConfig should not be loaded in {@link (LayoutManager:class)} constructor, but rather in a
     * {@link (LayoutManager:class).loadLayout} call.  If LayoutConfig is not specified in {@link (LayoutManager:class)} constructor,
     * then init() will be automatically called internally and should not be called externally.
     */
    init() {
        /**
         * If the document isn't ready yet, wait for it.
         */
        if (!this._bindComponentEventHanlderPassedInConstructor && (document.readyState === 'loading' || document.body === null)) {
            document.addEventListener('DOMContentLoaded', () => this.init(), { passive: true });
            return;
        }
        /**
         * If this is a subwindow, wait a few milliseconds for the original
         * page's js calls to be executed, then replace the bodies content
         * with GoldenLayout
         */
        if (!this._bindComponentEventHanlderPassedInConstructor && this.isSubWindow === true && !this._creationTimeoutPassed) {
            setTimeout(() => this.init(), 7);
            this._creationTimeoutPassed = true;
            return;
        }
        if (this.isSubWindow === true) {
            if (!this._bindComponentEventHanlderPassedInConstructor) {
                this.clearHtmlAndAdjustStylesForSubWindow();
            }
            // Expose this instance on the window object to allow the opening window to interact with it
            window.__glInstance = this;
        }
        super.init();
    }
    /**
     * Clears existing HTML and adjusts style to make window suitable to be a popout sub window
     * Curently is automatically called when window is a subWindow and bindComponentEvent is not passed in the constructor
     * If bindComponentEvent is not passed in the constructor, the application must either call this function explicitly or
     * (preferably) make the window suitable as a subwindow.
     * In the future, it is planned that this function is NOT automatically called in any circumstances.  Applications will
     * need to determine whether a window is a Golden Layout popout window and either call this function explicitly or
     * hide HTML not relevant to the popout.
     * See apitest for an example of how HTML is hidden when popout windows are displayed
     */
    clearHtmlAndAdjustStylesForSubWindow() {
        const headElement = document.head;
        const appendNodeLists = new Array(4);
        appendNodeLists[0] = document.querySelectorAll('body link');
        appendNodeLists[1] = document.querySelectorAll('body style');
        appendNodeLists[2] = document.querySelectorAll('template');
        appendNodeLists[3] = document.querySelectorAll('.gl_keep');
        for (let listIdx = 0; listIdx < appendNodeLists.length; listIdx++) {
            const appendNodeList = appendNodeLists[listIdx];
            for (let nodeIdx = 0; nodeIdx < appendNodeList.length; nodeIdx++) {
                const node = appendNodeList[nodeIdx];
                headElement.appendChild(node);
            }
        }
        const bodyElement = document.body;
        bodyElement.innerHTML = '';
        bodyElement.style.visibility = 'visible';
        this.checkAddDefaultPopinButton();
        /*
        * This seems a bit pointless, but actually causes a reflow/re-evaluation getting around
        * slickgrid's "Cannot find stylesheet." bug in chrome
        */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const x = document.body.offsetHeight;
    }
    /**
     * Will add button if not popinOnClose specified in settings
     * @returns true if added otherwise false
     */
    checkAddDefaultPopinButton() {
        if (this.layoutConfig.settings.popInOnClose) {
            return false;
        }
        else {
            const popInButtonElement = document.createElement('div');
            popInButtonElement.classList.add("lm_popin" /* Popin */);
            popInButtonElement.setAttribute('title', this.layoutConfig.header.dock);
            const iconElement = document.createElement('div');
            iconElement.classList.add("lm_icon" /* Icon */);
            const bgElement = document.createElement('div');
            bgElement.classList.add("lm_bg" /* Bg */);
            popInButtonElement.appendChild(iconElement);
            popInButtonElement.appendChild(bgElement);
            popInButtonElement.addEventListener('click', () => this.emit('popIn'));
            document.body.appendChild(popInButtonElement);
            return true;
        }
    }
    /** @internal */
    bindComponent(container, itemConfig) {
        if (this.bindComponentEvent !== undefined) {
            const bindableComponent = this.bindComponentEvent(container, itemConfig);
            return bindableComponent;
        }
        else {
            if (this.getComponentEvent !== undefined) {
                return {
                    virtual: false,
                    component: this.getComponentEvent(container, itemConfig),
                };
            }
            else {
                // There is no component registered for this type, and we don't have a getComponentEvent defined.
                // This might happen when the user pops out a dialog and the component types are not registered upfront.
                const text = i18n_strings_1.i18nStrings[2 /* ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned */];
                const message = `${text}: ${JSON.stringify(itemConfig)}`;
                throw new external_error_1.BindError(message);
            }
        }
    }
    /** @internal */
    unbindComponent(container, virtual, component) {
        if (this.unbindComponentEvent !== undefined) {
            this.unbindComponentEvent(container);
        }
        else {
            if (!virtual && this.releaseComponentEvent !== undefined) {
                if (component === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('VCUCRCU333998');
                }
                else {
                    this.releaseComponentEvent(container, component);
                }
            }
        }
    }
}
exports.VirtualLayout = VirtualLayout;
/** @public */
(function (VirtualLayout) {
    /** @internal
     * Veriable to hold the state whether we already checked if we are running in a sub window.
     * Fixes popout and creation of nested golden-layouts.
     */
    let subWindowChecked = false;
    /** @internal */
    function createLayoutManagerConstructorParameters(configOrOptionalContainer, containerOrBindComponentEventHandler) {
        const windowConfigKey = subWindowChecked ? null : new URL(document.location.href).searchParams.get('gl-window');
        subWindowChecked = true;
        const isSubWindow = windowConfigKey !== null;
        let containerElement;
        let config;
        if (windowConfigKey !== null) {
            const windowConfigStr = localStorage.getItem(windowConfigKey);
            if (windowConfigStr === null) {
                throw new Error('Null gl-window Config');
            }
            localStorage.removeItem(windowConfigKey);
            const minifiedWindowConfig = JSON.parse(windowConfigStr);
            const resolvedConfig = resolved_config_1.ResolvedLayoutConfig.unminifyConfig(minifiedWindowConfig);
            config = config_1.LayoutConfig.fromResolved(resolvedConfig);
            if (configOrOptionalContainer instanceof HTMLElement) {
                containerElement = configOrOptionalContainer;
            }
        }
        else {
            if (configOrOptionalContainer === undefined) {
                config = undefined;
            }
            else {
                if (configOrOptionalContainer instanceof HTMLElement) {
                    config = undefined;
                    containerElement = configOrOptionalContainer;
                }
                else {
                    // backwards compatibility
                    config = configOrOptionalContainer;
                }
            }
            if (containerElement === undefined) {
                if (containerOrBindComponentEventHandler instanceof HTMLElement) {
                    containerElement = containerOrBindComponentEventHandler;
                }
            }
        }
        return {
            constructorOrSubWindowLayoutConfig: config,
            isSubWindow,
            containerElement,
        };
    }
    VirtualLayout.createLayoutManagerConstructorParameters = createLayoutManagerConstructorParameters;
})(VirtualLayout = exports.VirtualLayout || (exports.VirtualLayout = {}));

},{"./config/config":3,"./config/resolved-config":4,"./errors/external-error":16,"./errors/internal-error":17,"./layout-manager":25,"./utils/i18n-strings":30}],35:[function(require,module,exports){
/* interact.js 1.10.27 | https://raw.github.com/taye/interact.js/main/LICENSE */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).interact=e()}(this,(function(){"use strict";function t(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function e(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?t(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,d(r.key),r)}}function o(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function a(t,e,n){return(e=d(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&l(t,e)}function c(t){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},c(t)}function l(t,e){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},l(t,e)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var i=c(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return u(t)}(this,n)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=c(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(arguments.length<3?t:n):i.value}},f.apply(this,arguments)}function d(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:e+""}var h=function(t){return!(!t||!t.Window)&&t instanceof t.Window},v=void 0,g=void 0;function m(t){v=t;var e=t.document.createTextNode("");e.ownerDocument!==t.document&&"function"==typeof t.wrap&&t.wrap(e)===e&&(t=t.wrap(t)),g=t}function y(t){return h(t)?t:(t.ownerDocument||t).defaultView||g.window}"undefined"!=typeof window&&window&&m(window);var b=function(t){return!!t&&"object"===n(t)},x=function(t){return"function"==typeof t},w={window:function(t){return t===g||h(t)},docFrag:function(t){return b(t)&&11===t.nodeType},object:b,func:x,number:function(t){return"number"==typeof t},bool:function(t){return"boolean"==typeof t},string:function(t){return"string"==typeof t},element:function(t){if(!t||"object"!==n(t))return!1;var e=y(t)||g;return/object|function/.test("undefined"==typeof Element?"undefined":n(Element))?t instanceof Element||t instanceof e.Element:1===t.nodeType&&"string"==typeof t.nodeName},plainObject:function(t){return b(t)&&!!t.constructor&&/function Object\b/.test(t.constructor.toString())},array:function(t){return b(t)&&void 0!==t.length&&x(t.splice)}};function E(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.prepared.axis;"x"===n?(e.coords.cur.page.y=e.coords.start.page.y,e.coords.cur.client.y=e.coords.start.client.y,e.coords.velocity.client.y=0,e.coords.velocity.page.y=0):"y"===n&&(e.coords.cur.page.x=e.coords.start.page.x,e.coords.cur.client.x=e.coords.start.client.x,e.coords.velocity.client.x=0,e.coords.velocity.page.x=0)}}function T(t){var e=t.iEvent,n=t.interaction;if("drag"===n.prepared.name){var r=n.prepared.axis;if("x"===r||"y"===r){var i="x"===r?"y":"x";e.page[i]=n.coords.start.page[i],e.client[i]=n.coords.start.client[i],e.delta[i]=0}}}var S={id:"actions/drag",install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.draggable=S.draggable,e.map.drag=S,e.methodDict.drag="draggable",r.actions.drag=S.defaults},listeners:{"interactions:before-action-move":E,"interactions:action-resume":E,"interactions:action-move":T,"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.buttons,i=n.options.drag;if(i&&i.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(r&n.options.drag.mouseButtons)))return t.action={name:"drag",axis:"start"===i.lockAxis?i.startAxis:i.lockAxis},!1}},draggable:function(t){return w.object(t)?(this.options.drag.enabled=!1!==t.enabled,this.setPerAction("drag",t),this.setOnEvents("drag",t),/^(xy|x|y|start)$/.test(t.lockAxis)&&(this.options.drag.lockAxis=t.lockAxis),/^(xy|x|y)$/.test(t.startAxis)&&(this.options.drag.startAxis=t.startAxis),this):w.bool(t)?(this.options.drag.enabled=t,this):this.options.drag},beforeMove:E,move:T,defaults:{startAxis:"xy",lockAxis:"xy"},getCursor:function(){return"move"},filterEventType:function(t){return 0===t.search("drag")}},_=S,P={init:function(t){var e=t;P.document=e.document,P.DocumentFragment=e.DocumentFragment||O,P.SVGElement=e.SVGElement||O,P.SVGSVGElement=e.SVGSVGElement||O,P.SVGElementInstance=e.SVGElementInstance||O,P.Element=e.Element||O,P.HTMLElement=e.HTMLElement||P.Element,P.Event=e.Event,P.Touch=e.Touch||O,P.PointerEvent=e.PointerEvent||e.MSPointerEvent},document:null,DocumentFragment:null,SVGElement:null,SVGSVGElement:null,SVGElementInstance:null,Element:null,HTMLElement:null,Event:null,Touch:null,PointerEvent:null};function O(){}var k=P;var D={init:function(t){var e=k.Element,n=t.navigator||{};D.supportsTouch="ontouchstart"in t||w.func(t.DocumentTouch)&&k.document instanceof t.DocumentTouch,D.supportsPointerEvent=!1!==n.pointerEnabled&&!!k.PointerEvent,D.isIOS=/iP(hone|od|ad)/.test(n.platform),D.isIOS7=/iP(hone|od|ad)/.test(n.platform)&&/OS 7[^\d]/.test(n.appVersion),D.isIe9=/MSIE 9/.test(n.userAgent),D.isOperaMobile="Opera"===n.appName&&D.supportsTouch&&/Presto/.test(n.userAgent),D.prefixedMatchesSelector="matches"in e.prototype?"matches":"webkitMatchesSelector"in e.prototype?"webkitMatchesSelector":"mozMatchesSelector"in e.prototype?"mozMatchesSelector":"oMatchesSelector"in e.prototype?"oMatchesSelector":"msMatchesSelector",D.pEventTypes=D.supportsPointerEvent?k.PointerEvent===t.MSPointerEvent?{up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"}:null,D.wheelEvent=k.document&&"onmousewheel"in k.document?"mousewheel":"wheel"},supportsTouch:null,supportsPointerEvent:null,isIOS7:null,isIOS:null,isIe9:null,isOperaMobile:null,prefixedMatchesSelector:null,pEventTypes:null,wheelEvent:null};var I=D;function M(t,e){if(t.contains)return t.contains(e);for(;e;){if(e===t)return!0;e=e.parentNode}return!1}function z(t,e){for(;w.element(t);){if(R(t,e))return t;t=A(t)}return null}function A(t){var e=t.parentNode;if(w.docFrag(e)){for(;(e=e.host)&&w.docFrag(e););return e}return e}function R(t,e){return g!==v&&(e=e.replace(/\/deep\//g," ")),t[I.prefixedMatchesSelector](e)}var C=function(t){return t.parentNode||t.host};function j(t,e){for(var n,r=[],i=t;(n=C(i))&&i!==e&&n!==i.ownerDocument;)r.unshift(i),i=n;return r}function F(t,e,n){for(;w.element(t);){if(R(t,e))return!0;if((t=A(t))===n)return R(t,e)}return!1}function X(t){return t.correspondingUseElement||t}function Y(t){var e=t instanceof k.SVGElement?t.getBoundingClientRect():t.getClientRects()[0];return e&&{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width||e.right-e.left,height:e.height||e.bottom-e.top}}function L(t){var e,n=Y(t);if(!I.isIOS7&&n){var r={x:(e=(e=y(t))||g).scrollX||e.document.documentElement.scrollLeft,y:e.scrollY||e.document.documentElement.scrollTop};n.left+=r.x,n.right+=r.x,n.top+=r.y,n.bottom+=r.y}return n}function q(t){for(var e=[];t;)e.push(t),t=A(t);return e}function B(t){return!!w.string(t)&&(k.document.querySelector(t),!0)}function V(t,e){for(var n in e)t[n]=e[n];return t}function W(t,e,n){return"parent"===t?A(n):"self"===t?e.getRect(n):z(n,t)}function G(t,e,n,r){var i=t;return w.string(i)?i=W(i,e,n):w.func(i)&&(i=i.apply(void 0,r)),w.element(i)&&(i=L(i)),i}function N(t){return t&&{x:"x"in t?t.x:t.left,y:"y"in t?t.y:t.top}}function U(t){return!t||"x"in t&&"y"in t||((t=V({},t)).x=t.left||0,t.y=t.top||0,t.width=t.width||(t.right||0)-t.x,t.height=t.height||(t.bottom||0)-t.y),t}function H(t,e,n){t.left&&(e.left+=n.x),t.right&&(e.right+=n.x),t.top&&(e.top+=n.y),t.bottom&&(e.bottom+=n.y),e.width=e.right-e.left,e.height=e.bottom-e.top}function K(t,e,n){var r=n&&t.options[n];return N(G(r&&r.origin||t.options.origin,t,e,[t&&e]))||{x:0,y:0}}function $(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(t){return!0},r=arguments.length>3?arguments[3]:void 0;if(r=r||{},w.string(t)&&-1!==t.search(" ")&&(t=J(t)),w.array(t))return t.forEach((function(t){return $(t,e,n,r)})),r;if(w.object(t)&&(e=t,t=""),w.func(e)&&n(t))r[t]=r[t]||[],r[t].push(e);else if(w.array(e))for(var i=0,o=e;i<o.length;i++){var a=o[i];$(t,a,n,r)}else if(w.object(e))for(var s in e){$(J(s).map((function(e){return"".concat(t).concat(e)})),e[s],n,r)}return r}function J(t){return t.trim().split(/ +/)}var Q=function(t,e){return Math.sqrt(t*t+e*e)},Z=["webkit","moz"];function tt(t,e){t.__set||(t.__set={});var n=function(n){if(Z.some((function(t){return 0===n.indexOf(t)})))return 1;"function"!=typeof t[n]&&"__set"!==n&&Object.defineProperty(t,n,{get:function(){return n in t.__set?t.__set[n]:t.__set[n]=e[n]},set:function(e){t.__set[n]=e},configurable:!0})};for(var r in e)n(r);return t}function et(t,e){t.page=t.page||{},t.page.x=e.page.x,t.page.y=e.page.y,t.client=t.client||{},t.client.x=e.client.x,t.client.y=e.client.y,t.timeStamp=e.timeStamp}function nt(t){t.page.x=0,t.page.y=0,t.client.x=0,t.client.y=0}function rt(t){return t instanceof k.Event||t instanceof k.Touch}function it(t,e,n){return t=t||"page",(n=n||{}).x=e[t+"X"],n.y=e[t+"Y"],n}function ot(t,e){return e=e||{x:0,y:0},I.isOperaMobile&&rt(t)?(it("screen",t,e),e.x+=window.scrollX,e.y+=window.scrollY):it("page",t,e),e}function at(t){return w.number(t.pointerId)?t.pointerId:t.identifier}function st(t,e,n){var r=e.length>1?lt(e):e[0];ot(r,t.page),function(t,e){e=e||{},I.isOperaMobile&&rt(t)?it("screen",t,e):it("client",t,e)}(r,t.client),t.timeStamp=n}function ct(t){var e=[];return w.array(t)?(e[0]=t[0],e[1]=t[1]):"touchend"===t.type?1===t.touches.length?(e[0]=t.touches[0],e[1]=t.changedTouches[0]):0===t.touches.length&&(e[0]=t.changedTouches[0],e[1]=t.changedTouches[1]):(e[0]=t.touches[0],e[1]=t.touches[1]),e}function lt(t){for(var e={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},n=0;n<t.length;n++){var r=t[n];for(var i in e)e[i]+=r[i]}for(var o in e)e[o]/=t.length;return e}function ut(t){if(!t.length)return null;var e=ct(t),n=Math.min(e[0].pageX,e[1].pageX),r=Math.min(e[0].pageY,e[1].pageY),i=Math.max(e[0].pageX,e[1].pageX),o=Math.max(e[0].pageY,e[1].pageY);return{x:n,y:r,left:n,top:r,right:i,bottom:o,width:i-n,height:o-r}}function pt(t,e){var n=e+"X",r=e+"Y",i=ct(t),o=i[0][n]-i[1][n],a=i[0][r]-i[1][r];return Q(o,a)}function ft(t,e){var n=e+"X",r=e+"Y",i=ct(t),o=i[1][n]-i[0][n],a=i[1][r]-i[0][r];return 180*Math.atan2(a,o)/Math.PI}function dt(t){return w.string(t.pointerType)?t.pointerType:w.number(t.pointerType)?[void 0,void 0,"touch","pen","mouse"][t.pointerType]:/touch/.test(t.type||"")||t instanceof k.Touch?"touch":"mouse"}function ht(t){var e=w.func(t.composedPath)?t.composedPath():t.path;return[X(e?e[0]:t.target),X(t.currentTarget)]}var vt=function(){function t(e){r(this,t),this.immediatePropagationStopped=!1,this.propagationStopped=!1,this._interaction=e}return o(t,[{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}]),t}();Object.defineProperty(vt.prototype,"interaction",{get:function(){return this._interaction._proxy},set:function(){}});var gt=function(t,e){for(var n=0;n<e.length;n++){var r=e[n];t.push(r)}return t},mt=function(t){return gt([],t)},yt=function(t,e){for(var n=0;n<t.length;n++)if(e(t[n],n,t))return n;return-1},bt=function(t,e){return t[yt(t,e)]},xt=function(t){s(n,t);var e=p(n);function n(t,i,o){var a;r(this,n),(a=e.call(this,i._interaction)).dropzone=void 0,a.dragEvent=void 0,a.relatedTarget=void 0,a.draggable=void 0,a.propagationStopped=!1,a.immediatePropagationStopped=!1;var s="dragleave"===o?t.prev:t.cur,c=s.element,l=s.dropzone;return a.type=o,a.target=c,a.currentTarget=c,a.dropzone=l,a.dragEvent=i,a.relatedTarget=i.target,a.draggable=i.interactable,a.timeStamp=i.timeStamp,a}return o(n,[{key:"reject",value:function(){var t=this,e=this._interaction.dropState;if("dropactivate"===this.type||this.dropzone&&e.cur.dropzone===this.dropzone&&e.cur.element===this.target)if(e.prev.dropzone=this.dropzone,e.prev.element=this.target,e.rejected=!0,e.events.enter=null,this.stopImmediatePropagation(),"dropactivate"===this.type){var r=e.activeDrops,i=yt(r,(function(e){var n=e.dropzone,r=e.element;return n===t.dropzone&&r===t.target}));e.activeDrops.splice(i,1);var o=new n(e,this.dragEvent,"dropdeactivate");o.dropzone=this.dropzone,o.target=this.target,this.dropzone.fire(o)}else this.dropzone.fire(new n(e,this.dragEvent,"dragleave"))}},{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}]),n}(vt);function wt(t,e){for(var n=0,r=t.slice();n<r.length;n++){var i=r[n],o=i.dropzone,a=i.element;e.dropzone=o,e.target=a,o.fire(e),e.propagationStopped=e.immediatePropagationStopped=!1}}function Et(t,e){for(var n=function(t,e){for(var n=[],r=0,i=t.interactables.list;r<i.length;r++){var o=i[r];if(o.options.drop.enabled){var a=o.options.drop.accept;if(!(w.element(a)&&a!==e||w.string(a)&&!R(e,a)||w.func(a)&&!a({dropzone:o,draggableElement:e})))for(var s=0,c=o.getAllElements();s<c.length;s++){var l=c[s];l!==e&&n.push({dropzone:o,element:l,rect:o.getRect(l)})}}}return n}(t,e),r=0;r<n.length;r++){var i=n[r];i.rect=i.dropzone.getRect(i.element)}return n}function Tt(t,e,n){for(var r=t.dropState,i=t.interactable,o=t.element,a=[],s=0,c=r.activeDrops;s<c.length;s++){var l=c[s],u=l.dropzone,p=l.element,f=l.rect,d=u.dropCheck(e,n,i,o,p,f);a.push(d?p:null)}var h=function(t){for(var e,n,r,i=[],o=0;o<t.length;o++){var a=t[o],s=t[e];if(a&&o!==e)if(s){var c=C(a),l=C(s);if(c!==a.ownerDocument)if(l!==a.ownerDocument)if(c!==l){i=i.length?i:j(s);var u=void 0;if(s instanceof k.HTMLElement&&a instanceof k.SVGElement&&!(a instanceof k.SVGSVGElement)){if(a===l)continue;u=a.ownerSVGElement}else u=a;for(var p=j(u,s.ownerDocument),f=0;p[f]&&p[f]===i[f];)f++;var d=[p[f-1],p[f],i[f]];if(d[0])for(var h=d[0].lastChild;h;){if(h===d[1]){e=o,i=p;break}if(h===d[2])break;h=h.previousSibling}}else r=s,void 0,void 0,(parseInt(y(n=a).getComputedStyle(n).zIndex,10)||0)>=(parseInt(y(r).getComputedStyle(r).zIndex,10)||0)&&(e=o);else e=o}else e=o}return e}(a);return r.activeDrops[h]||null}function St(t,e,n){var r=t.dropState,i={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};return"dragstart"===n.type&&(i.activate=new xt(r,n,"dropactivate"),i.activate.target=null,i.activate.dropzone=null),"dragend"===n.type&&(i.deactivate=new xt(r,n,"dropdeactivate"),i.deactivate.target=null,i.deactivate.dropzone=null),r.rejected||(r.cur.element!==r.prev.element&&(r.prev.dropzone&&(i.leave=new xt(r,n,"dragleave"),n.dragLeave=i.leave.target=r.prev.element,n.prevDropzone=i.leave.dropzone=r.prev.dropzone),r.cur.dropzone&&(i.enter=new xt(r,n,"dragenter"),n.dragEnter=r.cur.element,n.dropzone=r.cur.dropzone)),"dragend"===n.type&&r.cur.dropzone&&(i.drop=new xt(r,n,"drop"),n.dropzone=r.cur.dropzone,n.relatedTarget=r.cur.element),"dragmove"===n.type&&r.cur.dropzone&&(i.move=new xt(r,n,"dropmove"),n.dropzone=r.cur.dropzone)),i}function _t(t,e){var n=t.dropState,r=n.activeDrops,i=n.cur,o=n.prev;e.leave&&o.dropzone.fire(e.leave),e.enter&&i.dropzone.fire(e.enter),e.move&&i.dropzone.fire(e.move),e.drop&&i.dropzone.fire(e.drop),e.deactivate&&wt(r,e.deactivate),n.prev.dropzone=i.dropzone,n.prev.element=i.element}function Pt(t,e){var n=t.interaction,r=t.iEvent,i=t.event;if("dragmove"===r.type||"dragend"===r.type){var o=n.dropState;e.dynamicDrop&&(o.activeDrops=Et(e,n.element));var a=r,s=Tt(n,a,i);o.rejected=o.rejected&&!!s&&s.dropzone===o.cur.dropzone&&s.element===o.cur.element,o.cur.dropzone=s&&s.dropzone,o.cur.element=s&&s.element,o.events=St(n,0,a)}}var Ot={id:"actions/drop",install:function(t){var e=t.actions,n=t.interactStatic,r=t.Interactable,i=t.defaults;t.usePlugin(_),r.prototype.dropzone=function(t){return function(t,e){if(w.object(e)){if(t.options.drop.enabled=!1!==e.enabled,e.listeners){var n=$(e.listeners),r=Object.keys(n).reduce((function(t,e){return t[/^(enter|leave)/.test(e)?"drag".concat(e):/^(activate|deactivate|move)/.test(e)?"drop".concat(e):e]=n[e],t}),{}),i=t.options.drop.listeners;i&&t.off(i),t.on(r),t.options.drop.listeners=r}return w.func(e.ondrop)&&t.on("drop",e.ondrop),w.func(e.ondropactivate)&&t.on("dropactivate",e.ondropactivate),w.func(e.ondropdeactivate)&&t.on("dropdeactivate",e.ondropdeactivate),w.func(e.ondragenter)&&t.on("dragenter",e.ondragenter),w.func(e.ondragleave)&&t.on("dragleave",e.ondragleave),w.func(e.ondropmove)&&t.on("dropmove",e.ondropmove),/^(pointer|center)$/.test(e.overlap)?t.options.drop.overlap=e.overlap:w.number(e.overlap)&&(t.options.drop.overlap=Math.max(Math.min(1,e.overlap),0)),"accept"in e&&(t.options.drop.accept=e.accept),"checker"in e&&(t.options.drop.checker=e.checker),t}if(w.bool(e))return t.options.drop.enabled=e,t;return t.options.drop}(this,t)},r.prototype.dropCheck=function(t,e,n,r,i,o){return function(t,e,n,r,i,o,a){var s=!1;if(!(a=a||t.getRect(o)))return!!t.options.drop.checker&&t.options.drop.checker(e,n,s,t,o,r,i);var c=t.options.drop.overlap;if("pointer"===c){var l=K(r,i,"drag"),u=ot(e);u.x+=l.x,u.y+=l.y;var p=u.x>a.left&&u.x<a.right,f=u.y>a.top&&u.y<a.bottom;s=p&&f}var d=r.getRect(i);if(d&&"center"===c){var h=d.left+d.width/2,v=d.top+d.height/2;s=h>=a.left&&h<=a.right&&v>=a.top&&v<=a.bottom}if(d&&w.number(c)){s=Math.max(0,Math.min(a.right,d.right)-Math.max(a.left,d.left))*Math.max(0,Math.min(a.bottom,d.bottom)-Math.max(a.top,d.top))/(d.width*d.height)>=c}t.options.drop.checker&&(s=t.options.drop.checker(e,n,s,t,o,r,i));return s}(this,t,e,n,r,i,o)},n.dynamicDrop=function(e){return w.bool(e)?(t.dynamicDrop=e,n):t.dynamicDrop},V(e.phaselessTypes,{dragenter:!0,dragleave:!0,dropactivate:!0,dropdeactivate:!0,dropmove:!0,drop:!0}),e.methodDict.drop="dropzone",t.dynamicDrop=!1,i.actions.drop=Ot.defaults},listeners:{"interactions:before-action-start":function(t){var e=t.interaction;"drag"===e.prepared.name&&(e.dropState={cur:{dropzone:null,element:null},prev:{dropzone:null,element:null},rejected:null,events:null,activeDrops:[]})},"interactions:after-action-start":function(t,e){var n=t.interaction,r=(t.event,t.iEvent);if("drag"===n.prepared.name){var i=n.dropState;i.activeDrops=[],i.events={},i.activeDrops=Et(e,n.element),i.events=St(n,0,r),i.events.activate&&(wt(i.activeDrops,i.events.activate),e.fire("actions/drop:start",{interaction:n,dragEvent:r}))}},"interactions:action-move":Pt,"interactions:after-action-move":function(t,e){var n=t.interaction,r=t.iEvent;if("drag"===n.prepared.name){var i=n.dropState;_t(n,i.events),e.fire("actions/drop:move",{interaction:n,dragEvent:r}),i.events={}}},"interactions:action-end":function(t,e){if("drag"===t.interaction.prepared.name){var n=t.interaction,r=t.iEvent;Pt(t,e),_t(n,n.dropState.events),e.fire("actions/drop:end",{interaction:n,dragEvent:r})}},"interactions:stop":function(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.dropState;n&&(n.activeDrops=null,n.events=null,n.cur.dropzone=null,n.cur.element=null,n.prev.dropzone=null,n.prev.element=null,n.rejected=!1)}}},getActiveDrops:Et,getDrop:Tt,getDropEvents:St,fireDropEvents:_t,filterEventType:function(t){return 0===t.search("drag")||0===t.search("drop")},defaults:{enabled:!1,accept:null,overlap:"pointer"}},kt=Ot;function Dt(t){var e=t.interaction,n=t.iEvent,r=t.phase;if("gesture"===e.prepared.name){var i=e.pointers.map((function(t){return t.pointer})),o="start"===r,a="end"===r,s=e.interactable.options.deltaSource;if(n.touches=[i[0],i[1]],o)n.distance=pt(i,s),n.box=ut(i),n.scale=1,n.ds=0,n.angle=ft(i,s),n.da=0,e.gesture.startDistance=n.distance,e.gesture.startAngle=n.angle;else if(a||e.pointers.length<2){var c=e.prevEvent;n.distance=c.distance,n.box=c.box,n.scale=c.scale,n.ds=0,n.angle=c.angle,n.da=0}else n.distance=pt(i,s),n.box=ut(i),n.scale=n.distance/e.gesture.startDistance,n.angle=ft(i,s),n.ds=n.scale-e.gesture.scale,n.da=n.angle-e.gesture.angle;e.gesture.distance=n.distance,e.gesture.angle=n.angle,w.number(n.scale)&&n.scale!==1/0&&!isNaN(n.scale)&&(e.gesture.scale=n.scale)}}var It={id:"actions/gesture",before:["actions/drag","actions/resize"],install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.gesturable=function(t){return w.object(t)?(this.options.gesture.enabled=!1!==t.enabled,this.setPerAction("gesture",t),this.setOnEvents("gesture",t),this):w.bool(t)?(this.options.gesture.enabled=t,this):this.options.gesture},e.map.gesture=It,e.methodDict.gesture="gesturable",r.actions.gesture=It.defaults},listeners:{"interactions:action-start":Dt,"interactions:action-move":Dt,"interactions:action-end":Dt,"interactions:new":function(t){t.interaction.gesture={angle:0,distance:0,scale:1,startAngle:0,startDistance:0}},"auto-start:check":function(t){if(!(t.interaction.pointers.length<2)){var e=t.interactable.options.gesture;if(e&&e.enabled)return t.action={name:"gesture"},!1}}},defaults:{},getCursor:function(){return""},filterEventType:function(t){return 0===t.search("gesture")}},Mt=It;function zt(t,e,n,r,i,o,a){if(!e)return!1;if(!0===e){var s=w.number(o.width)?o.width:o.right-o.left,c=w.number(o.height)?o.height:o.bottom-o.top;if(a=Math.min(a,Math.abs(("left"===t||"right"===t?s:c)/2)),s<0&&("left"===t?t="right":"right"===t&&(t="left")),c<0&&("top"===t?t="bottom":"bottom"===t&&(t="top")),"left"===t){var l=s>=0?o.left:o.right;return n.x<l+a}if("top"===t){var u=c>=0?o.top:o.bottom;return n.y<u+a}if("right"===t)return n.x>(s>=0?o.right:o.left)-a;if("bottom"===t)return n.y>(c>=0?o.bottom:o.top)-a}return!!w.element(r)&&(w.element(e)?e===r:F(r,e,i))}function At(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.resizeAxes){var r=e;n.interactable.options.resize.square?("y"===n.resizeAxes?r.delta.x=r.delta.y:r.delta.y=r.delta.x,r.axes="xy"):(r.axes=n.resizeAxes,"x"===n.resizeAxes?r.delta.y=0:"y"===n.resizeAxes&&(r.delta.x=0))}}var Rt,Ct,jt={id:"actions/resize",before:["actions/drag"],install:function(t){var e=t.actions,n=t.browser,r=t.Interactable,i=t.defaults;jt.cursors=function(t){return t.isIe9?{x:"e-resize",y:"s-resize",xy:"se-resize",top:"n-resize",left:"w-resize",bottom:"s-resize",right:"e-resize",topleft:"se-resize",bottomright:"se-resize",topright:"ne-resize",bottomleft:"ne-resize"}:{x:"ew-resize",y:"ns-resize",xy:"nwse-resize",top:"ns-resize",left:"ew-resize",bottom:"ns-resize",right:"ew-resize",topleft:"nwse-resize",bottomright:"nwse-resize",topright:"nesw-resize",bottomleft:"nesw-resize"}}(n),jt.defaultMargin=n.supportsTouch||n.supportsPointerEvent?20:10,r.prototype.resizable=function(e){return function(t,e,n){if(w.object(e))return t.options.resize.enabled=!1!==e.enabled,t.setPerAction("resize",e),t.setOnEvents("resize",e),w.string(e.axis)&&/^x$|^y$|^xy$/.test(e.axis)?t.options.resize.axis=e.axis:null===e.axis&&(t.options.resize.axis=n.defaults.actions.resize.axis),w.bool(e.preserveAspectRatio)?t.options.resize.preserveAspectRatio=e.preserveAspectRatio:w.bool(e.square)&&(t.options.resize.square=e.square),t;if(w.bool(e))return t.options.resize.enabled=e,t;return t.options.resize}(this,e,t)},e.map.resize=jt,e.methodDict.resize="resizable",i.actions.resize=jt.defaults},listeners:{"interactions:new":function(t){t.interaction.resizeAxes="xy"},"interactions:action-start":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,i=n.rect;n._rects={start:V({},i),corrected:V({},i),previous:V({},i),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}},r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}}(t),At(t)},"interactions:action-move":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,i=n.interactable.options.resize.invert,o="reposition"===i||"negate"===i,a=n.rect,s=n._rects,c=s.start,l=s.corrected,u=s.delta,p=s.previous;if(V(p,l),o){if(V(l,a),"reposition"===i){if(l.top>l.bottom){var f=l.top;l.top=l.bottom,l.bottom=f}if(l.left>l.right){var d=l.left;l.left=l.right,l.right=d}}}else l.top=Math.min(a.top,c.bottom),l.bottom=Math.max(a.bottom,c.top),l.left=Math.min(a.left,c.right),l.right=Math.max(a.right,c.left);for(var h in l.width=l.right-l.left,l.height=l.bottom-l.top,l)u[h]=l[h]-p[h];r.edges=n.prepared.edges,r.rect=l,r.deltaRect=u}}(t),At(t)},"interactions:action-end":function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e;r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}},"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.element,i=t.rect,o=t.buttons;if(i){var a=V({},e.coords.cur.page),s=n.options.resize;if(s&&s.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(o&s.mouseButtons))){if(w.object(s.edges)){var c={left:!1,right:!1,top:!1,bottom:!1};for(var l in c)c[l]=zt(l,s.edges[l],a,e._latestPointer.eventTarget,r,i,s.margin||jt.defaultMargin);c.left=c.left&&!c.right,c.top=c.top&&!c.bottom,(c.left||c.right||c.top||c.bottom)&&(t.action={name:"resize",edges:c})}else{var u="y"!==s.axis&&a.x>i.right-jt.defaultMargin,p="x"!==s.axis&&a.y>i.bottom-jt.defaultMargin;(u||p)&&(t.action={name:"resize",axes:(u?"x":"")+(p?"y":"")})}return!t.action&&void 0}}}},defaults:{square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},cursors:null,getCursor:function(t){var e=t.edges,n=t.axis,r=t.name,i=jt.cursors,o=null;if(n)o=i[r+n];else if(e){for(var a="",s=0,c=["top","bottom","left","right"];s<c.length;s++){var l=c[s];e[l]&&(a+=l)}o=i[a]}return o},filterEventType:function(t){return 0===t.search("resize")},defaultMargin:null},Ft=jt,Xt={id:"actions",install:function(t){t.usePlugin(Mt),t.usePlugin(Ft),t.usePlugin(_),t.usePlugin(kt)}},Yt=0;var Lt={request:function(t){return Rt(t)},cancel:function(t){return Ct(t)},init:function(t){if(Rt=t.requestAnimationFrame,Ct=t.cancelAnimationFrame,!Rt)for(var e=["ms","moz","webkit","o"],n=0;n<e.length;n++){var r=e[n];Rt=t["".concat(r,"RequestAnimationFrame")],Ct=t["".concat(r,"CancelAnimationFrame")]||t["".concat(r,"CancelRequestAnimationFrame")]}Rt=Rt&&Rt.bind(t),Ct=Ct&&Ct.bind(t),Rt||(Rt=function(e){var n=Date.now(),r=Math.max(0,16-(n-Yt)),i=t.setTimeout((function(){e(n+r)}),r);return Yt=n+r,i},Ct=function(t){return clearTimeout(t)})}};var qt={defaults:{enabled:!1,margin:60,container:null,speed:300},now:Date.now,interaction:null,i:0,x:0,y:0,isScrolling:!1,prevTime:0,margin:0,speed:0,start:function(t){qt.isScrolling=!0,Lt.cancel(qt.i),t.autoScroll=qt,qt.interaction=t,qt.prevTime=qt.now(),qt.i=Lt.request(qt.scroll)},stop:function(){qt.isScrolling=!1,qt.interaction&&(qt.interaction.autoScroll=null),Lt.cancel(qt.i)},scroll:function(){var t=qt.interaction,e=t.interactable,n=t.element,r=t.prepared.name,i=e.options[r].autoScroll,o=Bt(i.container,e,n),a=qt.now(),s=(a-qt.prevTime)/1e3,c=i.speed*s;if(c>=1){var l={x:qt.x*c,y:qt.y*c};if(l.x||l.y){var u=Vt(o);w.window(o)?o.scrollBy(l.x,l.y):o&&(o.scrollLeft+=l.x,o.scrollTop+=l.y);var p=Vt(o),f={x:p.x-u.x,y:p.y-u.y};(f.x||f.y)&&e.fire({type:"autoscroll",target:n,interactable:e,delta:f,interaction:t,container:o})}qt.prevTime=a}qt.isScrolling&&(Lt.cancel(qt.i),qt.i=Lt.request(qt.scroll))},check:function(t,e){var n;return null==(n=t.options[e].autoScroll)?void 0:n.enabled},onInteractionMove:function(t){var e=t.interaction,n=t.pointer;if(e.interacting()&&qt.check(e.interactable,e.prepared.name))if(e.simulation)qt.x=qt.y=0;else{var r,i,o,a,s=e.interactable,c=e.element,l=e.prepared.name,u=s.options[l].autoScroll,p=Bt(u.container,s,c);if(w.window(p))a=n.clientX<qt.margin,r=n.clientY<qt.margin,i=n.clientX>p.innerWidth-qt.margin,o=n.clientY>p.innerHeight-qt.margin;else{var f=Y(p);a=n.clientX<f.left+qt.margin,r=n.clientY<f.top+qt.margin,i=n.clientX>f.right-qt.margin,o=n.clientY>f.bottom-qt.margin}qt.x=i?1:a?-1:0,qt.y=o?1:r?-1:0,qt.isScrolling||(qt.margin=u.margin,qt.speed=u.speed,qt.start(e))}}};function Bt(t,e,n){return(w.string(t)?W(t,e,n):t)||y(n)}function Vt(t){return w.window(t)&&(t=window.document.body),{x:t.scrollLeft,y:t.scrollTop}}var Wt={id:"auto-scroll",install:function(t){var e=t.defaults,n=t.actions;t.autoScroll=qt,qt.now=function(){return t.now()},n.phaselessTypes.autoscroll=!0,e.perAction.autoScroll=qt.defaults},listeners:{"interactions:new":function(t){t.interaction.autoScroll=null},"interactions:destroy":function(t){t.interaction.autoScroll=null,qt.stop(),qt.interaction&&(qt.interaction=null)},"interactions:stop":qt.stop,"interactions:action-move":function(t){return qt.onInteractionMove(t)}}},Gt=Wt;function Nt(t,e){var n=!1;return function(){return n||(g.console.warn(e),n=!0),t.apply(this,arguments)}}function Ut(t,e){return t.name=e.name,t.axis=e.axis,t.edges=e.edges,t}function Ht(t){return w.bool(t)?(this.options.styleCursor=t,this):null===t?(delete this.options.styleCursor,this):this.options.styleCursor}function Kt(t){return w.func(t)?(this.options.actionChecker=t,this):null===t?(delete this.options.actionChecker,this):this.options.actionChecker}var $t={id:"auto-start/interactableMethods",install:function(t){var e=t.Interactable;e.prototype.getAction=function(e,n,r,i){var o=function(t,e,n,r,i){var o=t.getRect(r),a=e.buttons||{0:1,1:4,3:8,4:16}[e.button],s={action:null,interactable:t,interaction:n,element:r,rect:o,buttons:a};return i.fire("auto-start:check",s),s.action}(this,n,r,i,t);return this.options.actionChecker?this.options.actionChecker(e,n,o,this,i,r):o},e.prototype.ignoreFrom=Nt((function(t){return this._backCompatOption("ignoreFrom",t)}),"Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."),e.prototype.allowFrom=Nt((function(t){return this._backCompatOption("allowFrom",t)}),"Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."),e.prototype.actionChecker=Kt,e.prototype.styleCursor=Ht}};function Jt(t,e,n,r,i){return e.testIgnoreAllow(e.options[t.name],n,r)&&e.options[t.name].enabled&&ee(e,n,t,i)?t:null}function Qt(t,e,n,r,i,o,a){for(var s=0,c=r.length;s<c;s++){var l=r[s],u=i[s],p=l.getAction(e,n,t,u);if(p){var f=Jt(p,l,u,o,a);if(f)return{action:f,interactable:l,element:u}}}return{action:null,interactable:null,element:null}}function Zt(t,e,n,r,i){var o=[],a=[],s=r;function c(t){o.push(t),a.push(s)}for(;w.element(s);){o=[],a=[],i.interactables.forEachMatch(s,c);var l=Qt(t,e,n,o,a,r,i);if(l.action&&!l.interactable.options[l.action.name].manualStart)return l;s=A(s)}return{action:null,interactable:null,element:null}}function te(t,e,n){var r=e.action,i=e.interactable,o=e.element;r=r||{name:null},t.interactable=i,t.element=o,Ut(t.prepared,r),t.rect=i&&r.name?i.getRect(o):null,ie(t,n),n.fire("autoStart:prepared",{interaction:t})}function ee(t,e,n,r){var i=t.options,o=i[n.name].max,a=i[n.name].maxPerElement,s=r.autoStart.maxInteractions,c=0,l=0,u=0;if(!(o&&a&&s))return!1;for(var p=0,f=r.interactions.list;p<f.length;p++){var d=f[p],h=d.prepared.name;if(d.interacting()){if(++c>=s)return!1;if(d.interactable===t){if((l+=h===n.name?1:0)>=o)return!1;if(d.element===e&&(u++,h===n.name&&u>=a))return!1}}}return s>0}function ne(t,e){return w.number(t)?(e.autoStart.maxInteractions=t,this):e.autoStart.maxInteractions}function re(t,e,n){var r=n.autoStart.cursorElement;r&&r!==t&&(r.style.cursor=""),t.ownerDocument.documentElement.style.cursor=e,t.style.cursor=e,n.autoStart.cursorElement=e?t:null}function ie(t,e){var n=t.interactable,r=t.element,i=t.prepared;if("mouse"===t.pointerType&&n&&n.options.styleCursor){var o="";if(i.name){var a=n.options[i.name].cursorChecker;o=w.func(a)?a(i,n,r,t._interacting):e.actions.map[i.name].getCursor(i)}re(t.element,o||"",e)}else e.autoStart.cursorElement&&re(e.autoStart.cursorElement,"",e)}var oe={id:"auto-start/base",before:["actions"],install:function(t){var e=t.interactStatic,n=t.defaults;t.usePlugin($t),n.base.actionChecker=null,n.base.styleCursor=!0,V(n.perAction,{manualStart:!1,max:1/0,maxPerElement:1,allowFrom:null,ignoreFrom:null,mouseButtons:1}),e.maxInteractions=function(e){return ne(e,t)},t.autoStart={maxInteractions:1/0,withinInteractionLimit:ee,cursorElement:null}},listeners:{"interactions:down":function(t,e){var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget;n.interacting()||te(n,Zt(n,r,i,o,e),e)},"interactions:move":function(t,e){!function(t,e){var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget;"mouse"!==n.pointerType||n.pointerIsDown||n.interacting()||te(n,Zt(n,r,i,o,e),e)}(t,e),function(t,e){var n=t.interaction;if(n.pointerIsDown&&!n.interacting()&&n.pointerWasMoved&&n.prepared.name){e.fire("autoStart:before-start",t);var r=n.interactable,i=n.prepared.name;i&&r&&(r.options[i].manualStart||!ee(r,n.element,n.prepared,e)?n.stop():(n.start(n.prepared,r,n.element),ie(n,e)))}}(t,e)},"interactions:stop":function(t,e){var n=t.interaction,r=n.interactable;r&&r.options.styleCursor&&re(n.element,"",e)}},maxInteractions:ne,withinInteractionLimit:ee,validateAction:Jt},ae=oe;var se={id:"auto-start/dragAxis",listeners:{"autoStart:before-start":function(t,e){var n=t.interaction,r=t.eventTarget,i=t.dx,o=t.dy;if("drag"===n.prepared.name){var a=Math.abs(i),s=Math.abs(o),c=n.interactable.options.drag,l=c.startAxis,u=a>s?"x":a<s?"y":"xy";if(n.prepared.axis="start"===c.lockAxis?u[0]:c.lockAxis,"xy"!==u&&"xy"!==l&&l!==u){n.prepared.name=null;for(var p=r,f=function(t){if(t!==n.interactable){var i=n.interactable.options.drag;if(!i.manualStart&&t.testIgnoreAllow(i,p,r)){var o=t.getAction(n.downPointer,n.downEvent,n,p);if(o&&"drag"===o.name&&function(t,e){if(!e)return!1;var n=e.options.drag.startAxis;return"xy"===t||"xy"===n||n===t}(u,t)&&ae.validateAction(o,t,p,r,e))return t}}};w.element(p);){var d=e.interactables.forEachMatch(p,f);if(d){n.prepared.name="drag",n.interactable=d,n.element=p;break}p=A(p)}}}}}};function ce(t){var e=t.prepared&&t.prepared.name;if(!e)return null;var n=t.interactable.options;return n[e].hold||n[e].delay}var le={id:"auto-start/hold",install:function(t){var e=t.defaults;t.usePlugin(ae),e.perAction.hold=0,e.perAction.delay=0},listeners:{"interactions:new":function(t){t.interaction.autoStartHoldTimer=null},"autoStart:prepared":function(t){var e=t.interaction,n=ce(e);n>0&&(e.autoStartHoldTimer=setTimeout((function(){e.start(e.prepared,e.interactable,e.element)}),n))},"interactions:move":function(t){var e=t.interaction,n=t.duplicate;e.autoStartHoldTimer&&e.pointerWasMoved&&!n&&(clearTimeout(e.autoStartHoldTimer),e.autoStartHoldTimer=null)},"autoStart:before-start":function(t){var e=t.interaction;ce(e)>0&&(e.prepared.name=null)}},getHoldDuration:ce},ue=le,pe={id:"auto-start",install:function(t){t.usePlugin(ae),t.usePlugin(ue),t.usePlugin(se)}},fe=function(t){return/^(always|never|auto)$/.test(t)?(this.options.preventDefault=t,this):w.bool(t)?(this.options.preventDefault=t?"always":"never",this):this.options.preventDefault};function de(t){var e=t.interaction,n=t.event;e.interactable&&e.interactable.checkAndPreventDefault(n)}var he={id:"core/interactablePreventDefault",install:function(t){var e=t.Interactable;e.prototype.preventDefault=fe,e.prototype.checkAndPreventDefault=function(e){return function(t,e,n){var r=t.options.preventDefault;if("never"!==r)if("always"!==r){if(e.events.supportsPassive&&/^touch(start|move)$/.test(n.type)){var i=y(n.target).document,o=e.getDocOptions(i);if(!o||!o.events||!1!==o.events.passive)return}/^(mouse|pointer|touch)*(down|start)/i.test(n.type)||w.element(n.target)&&R(n.target,"input,select,textarea,[contenteditable=true],[contenteditable=true] *")||n.preventDefault()}else n.preventDefault()}(this,t,e)},t.interactions.docEvents.push({type:"dragstart",listener:function(e){for(var n=0,r=t.interactions.list;n<r.length;n++){var i=r[n];if(i.element&&(i.element===e.target||M(i.element,e.target)))return void i.interactable.checkAndPreventDefault(e)}}})},listeners:["down","move","up","cancel"].reduce((function(t,e){return t["interactions:".concat(e)]=de,t}),{})};function ve(t,e){if(e.phaselessTypes[t])return!0;for(var n in e.map)if(0===t.indexOf(n)&&t.substr(n.length)in e.phases)return!0;return!1}function ge(t){var e={};for(var n in t){var r=t[n];w.plainObject(r)?e[n]=ge(r):w.array(r)?e[n]=mt(r):e[n]=r}return e}var me=function(){function t(e){r(this,t),this.states=[],this.startOffset={left:0,right:0,top:0,bottom:0},this.startDelta=void 0,this.result=void 0,this.endResult=void 0,this.startEdges=void 0,this.edges=void 0,this.interaction=void 0,this.interaction=e,this.result=ye(),this.edges={left:!1,right:!1,top:!1,bottom:!1}}return o(t,[{key:"start",value:function(t,e){var n,r,i=t.phase,o=this.interaction,a=function(t){var e=t.interactable.options[t.prepared.name],n=e.modifiers;if(n&&n.length)return n;return["snap","snapSize","snapEdges","restrict","restrictEdges","restrictSize"].map((function(t){var n=e[t];return n&&n.enabled&&{options:n,methods:n._methods}})).filter((function(t){return!!t}))}(o);this.prepareStates(a),this.startEdges=V({},o.edges),this.edges=V({},this.startEdges),this.startOffset=(n=o.rect,r=e,n?{left:r.x-n.left,top:r.y-n.top,right:n.right-r.x,bottom:n.bottom-r.y}:{left:0,top:0,right:0,bottom:0}),this.startDelta={x:0,y:0};var s=this.fillArg({phase:i,pageCoords:e,preEnd:!1});return this.result=ye(),this.startAll(s),this.result=this.setAll(s)}},{key:"fillArg",value:function(t){var e=this.interaction;return t.interaction=e,t.interactable=e.interactable,t.element=e.element,t.rect||(t.rect=e.rect),t.edges||(t.edges=this.startEdges),t.startOffset=this.startOffset,t}},{key:"startAll",value:function(t){for(var e=0,n=this.states;e<n.length;e++){var r=n[e];r.methods.start&&(t.state=r,r.methods.start(t))}}},{key:"setAll",value:function(t){var e=t.phase,n=t.preEnd,r=t.skipModifiers,i=t.rect,o=t.edges;t.coords=V({},t.pageCoords),t.rect=V({},i),t.edges=V({},o);for(var a=r?this.states.slice(r):this.states,s=ye(t.coords,t.rect),c=0;c<a.length;c++){var l,u=a[c],p=u.options,f=V({},t.coords),d=null;null!=(l=u.methods)&&l.set&&this.shouldDo(p,n,e)&&(t.state=u,d=u.methods.set(t),H(t.edges,t.rect,{x:t.coords.x-f.x,y:t.coords.y-f.y})),s.eventProps.push(d)}V(this.edges,t.edges),s.delta.x=t.coords.x-t.pageCoords.x,s.delta.y=t.coords.y-t.pageCoords.y,s.rectDelta.left=t.rect.left-i.left,s.rectDelta.right=t.rect.right-i.right,s.rectDelta.top=t.rect.top-i.top,s.rectDelta.bottom=t.rect.bottom-i.bottom;var h=this.result.coords,v=this.result.rect;if(h&&v){var g=s.rect.left!==v.left||s.rect.right!==v.right||s.rect.top!==v.top||s.rect.bottom!==v.bottom;s.changed=g||h.x!==s.coords.x||h.y!==s.coords.y}return s}},{key:"applyToInteraction",value:function(t){var e=this.interaction,n=t.phase,r=e.coords.cur,i=e.coords.start,o=this.result,a=this.startDelta,s=o.delta;"start"===n&&V(this.startDelta,o.delta);for(var c=0,l=[[i,a],[r,s]];c<l.length;c++){var u=l[c],p=u[0],f=u[1];p.page.x+=f.x,p.page.y+=f.y,p.client.x+=f.x,p.client.y+=f.y}var d=this.result.rectDelta,h=t.rect||e.rect;h.left+=d.left,h.right+=d.right,h.top+=d.top,h.bottom+=d.bottom,h.width=h.right-h.left,h.height=h.bottom-h.top}},{key:"setAndApply",value:function(t){var e=this.interaction,n=t.phase,r=t.preEnd,i=t.skipModifiers,o=this.setAll(this.fillArg({preEnd:r,phase:n,pageCoords:t.modifiedCoords||e.coords.cur.page}));if(this.result=o,!o.changed&&(!i||i<this.states.length)&&e.interacting())return!1;if(t.modifiedCoords){var a=e.coords.cur.page,s={x:t.modifiedCoords.x-a.x,y:t.modifiedCoords.y-a.y};o.coords.x+=s.x,o.coords.y+=s.y,o.delta.x+=s.x,o.delta.y+=s.y}this.applyToInteraction(t)}},{key:"beforeEnd",value:function(t){var e=t.interaction,n=t.event,r=this.states;if(r&&r.length){for(var i=!1,o=0;o<r.length;o++){var a=r[o];t.state=a;var s=a.options,c=a.methods,l=c.beforeEnd&&c.beforeEnd(t);if(l)return this.endResult=l,!1;i=i||!i&&this.shouldDo(s,!0,t.phase,!0)}i&&e.move({event:n,preEnd:!0})}}},{key:"stop",value:function(t){var e=t.interaction;if(this.states&&this.states.length){var n=V({states:this.states,interactable:e.interactable,element:e.element,rect:null},t);this.fillArg(n);for(var r=0,i=this.states;r<i.length;r++){var o=i[r];n.state=o,o.methods.stop&&o.methods.stop(n)}this.states=null,this.endResult=null}}},{key:"prepareStates",value:function(t){this.states=[];for(var e=0;e<t.length;e++){var n=t[e],r=n.options,i=n.methods,o=n.name;this.states.push({options:r,methods:i,index:e,name:o})}return this.states}},{key:"restoreInteractionCoords",value:function(t){var e=t.interaction,n=e.coords,r=e.rect,i=e.modification;if(i.result){for(var o=i.startDelta,a=i.result,s=a.delta,c=a.rectDelta,l=0,u=[[n.start,o],[n.cur,s]];l<u.length;l++){var p=u[l],f=p[0],d=p[1];f.page.x-=d.x,f.page.y-=d.y,f.client.x-=d.x,f.client.y-=d.y}r.left-=c.left,r.right-=c.right,r.top-=c.top,r.bottom-=c.bottom}}},{key:"shouldDo",value:function(t,e,n,r){return!(!t||!1===t.enabled||r&&!t.endOnly||t.endOnly&&!e||"start"===n&&!t.setStart)}},{key:"copyFrom",value:function(t){this.startOffset=t.startOffset,this.startDelta=t.startDelta,this.startEdges=t.startEdges,this.edges=t.edges,this.states=t.states.map((function(t){return ge(t)})),this.result=ye(V({},t.result.coords),V({},t.result.rect))}},{key:"destroy",value:function(){for(var t in this)this[t]=null}}]),t}();function ye(t,e){return{rect:e,coords:t,delta:{x:0,y:0},rectDelta:{left:0,right:0,top:0,bottom:0},eventProps:[],changed:!0}}function be(t,e){var n=t.defaults,r={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop},i=function(t){var i=t||{};for(var o in i.enabled=!1!==i.enabled,n)o in i||(i[o]=n[o]);var a={options:i,methods:r,name:e,enable:function(){return i.enabled=!0,a},disable:function(){return i.enabled=!1,a}};return a};return e&&"string"==typeof e&&(i._defaults=n,i._methods=r),i}function xe(t){var e=t.iEvent,n=t.interaction.modification.result;n&&(e.modifiers=n.eventProps)}var we={id:"modifiers/base",before:["actions"],install:function(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new":function(t){var e=t.interaction;e.modification=new me(e)},"interactions:before-action-start":function(t){var e=t.interaction,n=t.interaction.modification;n.start(t,e.coords.start.page),e.edges=n.edges,n.applyToInteraction(t)},"interactions:before-action-move":function(t){var e=t.interaction,n=e.modification,r=n.setAndApply(t);return e.edges=n.edges,r},"interactions:before-action-end":function(t){var e=t.interaction,n=e.modification,r=n.beforeEnd(t);return e.edges=n.startEdges,r},"interactions:action-start":xe,"interactions:action-move":xe,"interactions:action-end":xe,"interactions:after-action-start":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-move":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:stop":function(t){return t.interaction.modification.stop(t)}}},Ee=we,Te={base:{preventDefault:"auto",deltaSource:"page"},perAction:{enabled:!1,origin:{x:0,y:0}},actions:{}},Se=function(t){s(n,t);var e=p(n);function n(t,i,o,a,s,c,l){var p;r(this,n),(p=e.call(this,t)).relatedTarget=null,p.screenX=void 0,p.screenY=void 0,p.button=void 0,p.buttons=void 0,p.ctrlKey=void 0,p.shiftKey=void 0,p.altKey=void 0,p.metaKey=void 0,p.page=void 0,p.client=void 0,p.delta=void 0,p.rect=void 0,p.x0=void 0,p.y0=void 0,p.t0=void 0,p.dt=void 0,p.duration=void 0,p.clientX0=void 0,p.clientY0=void 0,p.velocity=void 0,p.speed=void 0,p.swipe=void 0,p.axes=void 0,p.preEnd=void 0,s=s||t.element;var f=t.interactable,d=(f&&f.options||Te).deltaSource,h=K(f,s,o),v="start"===a,g="end"===a,m=v?u(p):t.prevEvent,y=v?t.coords.start:g?{page:m.page,client:m.client,timeStamp:t.coords.cur.timeStamp}:t.coords.cur;return p.page=V({},y.page),p.client=V({},y.client),p.rect=V({},t.rect),p.timeStamp=y.timeStamp,g||(p.page.x-=h.x,p.page.y-=h.y,p.client.x-=h.x,p.client.y-=h.y),p.ctrlKey=i.ctrlKey,p.altKey=i.altKey,p.shiftKey=i.shiftKey,p.metaKey=i.metaKey,p.button=i.button,p.buttons=i.buttons,p.target=s,p.currentTarget=s,p.preEnd=c,p.type=l||o+(a||""),p.interactable=f,p.t0=v?t.pointers[t.pointers.length-1].downTime:m.t0,p.x0=t.coords.start.page.x-h.x,p.y0=t.coords.start.page.y-h.y,p.clientX0=t.coords.start.client.x-h.x,p.clientY0=t.coords.start.client.y-h.y,p.delta=v||g?{x:0,y:0}:{x:p[d].x-m[d].x,y:p[d].y-m[d].y},p.dt=t.coords.delta.timeStamp,p.duration=p.timeStamp-p.t0,p.velocity=V({},t.coords.velocity[d]),p.speed=Q(p.velocity.x,p.velocity.y),p.swipe=g||"inertiastart"===a?p.getSwipe():null,p}return o(n,[{key:"getSwipe",value:function(){var t=this._interaction;if(t.prevEvent.speed<600||this.timeStamp-t.prevEvent.timeStamp>150)return null;var e=180*Math.atan2(t.prevEvent.velocityY,t.prevEvent.velocityX)/Math.PI;e<0&&(e+=360);var n=112.5<=e&&e<247.5,r=202.5<=e&&e<337.5;return{up:r,down:!r&&22.5<=e&&e<157.5,left:n,right:!n&&(292.5<=e||e<67.5),angle:e,speed:t.prevEvent.speed,velocity:{x:t.prevEvent.velocityX,y:t.prevEvent.velocityY}}}},{key:"preventDefault",value:function(){}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}}]),n}(vt);Object.defineProperties(Se.prototype,{pageX:{get:function(){return this.page.x},set:function(t){this.page.x=t}},pageY:{get:function(){return this.page.y},set:function(t){this.page.y=t}},clientX:{get:function(){return this.client.x},set:function(t){this.client.x=t}},clientY:{get:function(){return this.client.y},set:function(t){this.client.y=t}},dx:{get:function(){return this.delta.x},set:function(t){this.delta.x=t}},dy:{get:function(){return this.delta.y},set:function(t){this.delta.y=t}},velocityX:{get:function(){return this.velocity.x},set:function(t){this.velocity.x=t}},velocityY:{get:function(){return this.velocity.y},set:function(t){this.velocity.y=t}}});var _e=o((function t(e,n,i,o,a){r(this,t),this.id=void 0,this.pointer=void 0,this.event=void 0,this.downTime=void 0,this.downTarget=void 0,this.id=e,this.pointer=n,this.event=i,this.downTime=o,this.downTarget=a})),Pe=function(t){return t.interactable="",t.element="",t.prepared="",t.pointerIsDown="",t.pointerWasMoved="",t._proxy="",t}({}),Oe=function(t){return t.start="",t.move="",t.end="",t.stop="",t.interacting="",t}({}),ke=0,De=function(){function t(e){var n=this,i=e.pointerType,o=e.scopeFire;r(this,t),this.interactable=null,this.element=null,this.rect=null,this._rects=void 0,this.edges=null,this._scopeFire=void 0,this.prepared={name:null,axis:null,edges:null},this.pointerType=void 0,this.pointers=[],this.downEvent=null,this.downPointer={},this._latestPointer={pointer:null,event:null,eventTarget:null},this.prevEvent=null,this.pointerIsDown=!1,this.pointerWasMoved=!1,this._interacting=!1,this._ending=!1,this._stopped=!0,this._proxy=void 0,this.simulation=null,this.doMove=Nt((function(t){this.move(t)}),"The interaction.doMove() method has been renamed to interaction.move()"),this.coords={start:{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0},prev:{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0},cur:{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0},delta:{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0},velocity:{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0}},this._id=ke++,this._scopeFire=o,this.pointerType=i;var a=this;this._proxy={};var s=function(t){Object.defineProperty(n._proxy,t,{get:function(){return a[t]}})};for(var c in Pe)s(c);var l=function(t){Object.defineProperty(n._proxy,t,{value:function(){return a[t].apply(a,arguments)}})};for(var u in Oe)l(u);this._scopeFire("interactions:new",{interaction:this})}return o(t,[{key:"pointerMoveTolerance",get:function(){return 1}},{key:"pointerDown",value:function(t,e,n){var r=this.updatePointer(t,e,n,!0),i=this.pointers[r];this._scopeFire("interactions:down",{pointer:t,event:e,eventTarget:n,pointerIndex:r,pointerInfo:i,type:"down",interaction:this})}},{key:"start",value:function(t,e,n){return!(this.interacting()||!this.pointerIsDown||this.pointers.length<("gesture"===t.name?2:1)||!e.options[t.name].enabled)&&(Ut(this.prepared,t),this.interactable=e,this.element=n,this.rect=e.getRect(n),this.edges=this.prepared.edges?V({},this.prepared.edges):{left:!0,right:!0,top:!0,bottom:!0},this._stopped=!1,this._interacting=this._doPhase({interaction:this,event:this.downEvent,phase:"start"})&&!this._stopped,this._interacting)}},{key:"pointerMove",value:function(t,e,n){this.simulation||this.modification&&this.modification.endResult||this.updatePointer(t,e,n,!1);var r,i,o=this.coords.cur.page.x===this.coords.prev.page.x&&this.coords.cur.page.y===this.coords.prev.page.y&&this.coords.cur.client.x===this.coords.prev.client.x&&this.coords.cur.client.y===this.coords.prev.client.y;this.pointerIsDown&&!this.pointerWasMoved&&(r=this.coords.cur.client.x-this.coords.start.client.x,i=this.coords.cur.client.y-this.coords.start.client.y,this.pointerWasMoved=Q(r,i)>this.pointerMoveTolerance);var a,s,c,l=this.getPointerIndex(t),u={pointer:t,pointerIndex:l,pointerInfo:this.pointers[l],event:e,type:"move",eventTarget:n,dx:r,dy:i,duplicate:o,interaction:this};o||(a=this.coords.velocity,s=this.coords.delta,c=Math.max(s.timeStamp/1e3,.001),a.page.x=s.page.x/c,a.page.y=s.page.y/c,a.client.x=s.client.x/c,a.client.y=s.client.y/c,a.timeStamp=c),this._scopeFire("interactions:move",u),o||this.simulation||(this.interacting()&&(u.type=null,this.move(u)),this.pointerWasMoved&&et(this.coords.prev,this.coords.cur))}},{key:"move",value:function(t){t&&t.event||nt(this.coords.delta),(t=V({pointer:this._latestPointer.pointer,event:this._latestPointer.event,eventTarget:this._latestPointer.eventTarget,interaction:this},t||{})).phase="move",this._doPhase(t)}},{key:"pointerUp",value:function(t,e,n,r){var i=this.getPointerIndex(t);-1===i&&(i=this.updatePointer(t,e,n,!1));var o=/cancel$/i.test(e.type)?"cancel":"up";this._scopeFire("interactions:".concat(o),{pointer:t,pointerIndex:i,pointerInfo:this.pointers[i],event:e,eventTarget:n,type:o,curEventTarget:r,interaction:this}),this.simulation||this.end(e),this.removePointer(t,e)}},{key:"documentBlur",value:function(t){this.end(t),this._scopeFire("interactions:blur",{event:t,type:"blur",interaction:this})}},{key:"end",value:function(t){var e;this._ending=!0,t=t||this._latestPointer.event,this.interacting()&&(e=this._doPhase({event:t,interaction:this,phase:"end"})),this._ending=!1,!0===e&&this.stop()}},{key:"currentAction",value:function(){return this._interacting?this.prepared.name:null}},{key:"interacting",value:function(){return this._interacting}},{key:"stop",value:function(){this._scopeFire("interactions:stop",{interaction:this}),this.interactable=this.element=null,this._interacting=!1,this._stopped=!0,this.prepared.name=this.prevEvent=null}},{key:"getPointerIndex",value:function(t){var e=at(t);return"mouse"===this.pointerType||"pen"===this.pointerType?this.pointers.length-1:yt(this.pointers,(function(t){return t.id===e}))}},{key:"getPointerInfo",value:function(t){return this.pointers[this.getPointerIndex(t)]}},{key:"updatePointer",value:function(t,e,n,r){var i,o,a,s=at(t),c=this.getPointerIndex(t),l=this.pointers[c];return r=!1!==r&&(r||/(down|start)$/i.test(e.type)),l?l.pointer=t:(l=new _e(s,t,e,null,null),c=this.pointers.length,this.pointers.push(l)),st(this.coords.cur,this.pointers.map((function(t){return t.pointer})),this._now()),i=this.coords.delta,o=this.coords.prev,a=this.coords.cur,i.page.x=a.page.x-o.page.x,i.page.y=a.page.y-o.page.y,i.client.x=a.client.x-o.client.x,i.client.y=a.client.y-o.client.y,i.timeStamp=a.timeStamp-o.timeStamp,r&&(this.pointerIsDown=!0,l.downTime=this.coords.cur.timeStamp,l.downTarget=n,tt(this.downPointer,t),this.interacting()||(et(this.coords.start,this.coords.cur),et(this.coords.prev,this.coords.cur),this.downEvent=e,this.pointerWasMoved=!1)),this._updateLatestPointer(t,e,n),this._scopeFire("interactions:update-pointer",{pointer:t,event:e,eventTarget:n,down:r,pointerInfo:l,pointerIndex:c,interaction:this}),c}},{key:"removePointer",value:function(t,e){var n=this.getPointerIndex(t);if(-1!==n){var r=this.pointers[n];this._scopeFire("interactions:remove-pointer",{pointer:t,event:e,eventTarget:null,pointerIndex:n,pointerInfo:r,interaction:this}),this.pointers.splice(n,1),this.pointerIsDown=!1}}},{key:"_updateLatestPointer",value:function(t,e,n){this._latestPointer.pointer=t,this._latestPointer.event=e,this._latestPointer.eventTarget=n}},{key:"destroy",value:function(){this._latestPointer.pointer=null,this._latestPointer.event=null,this._latestPointer.eventTarget=null}},{key:"_createPreparedEvent",value:function(t,e,n,r){return new Se(this,t,this.prepared.name,e,this.element,n,r)}},{key:"_fireEvent",value:function(t){var e;null==(e=this.interactable)||e.fire(t),(!this.prevEvent||t.timeStamp>=this.prevEvent.timeStamp)&&(this.prevEvent=t)}},{key:"_doPhase",value:function(t){var e=t.event,n=t.phase,r=t.preEnd,i=t.type,o=this.rect;if(o&&"move"===n&&(H(this.edges,o,this.coords.delta[this.interactable.options.deltaSource]),o.width=o.right-o.left,o.height=o.bottom-o.top),!1===this._scopeFire("interactions:before-action-".concat(n),t))return!1;var a=t.iEvent=this._createPreparedEvent(e,n,r,i);return this._scopeFire("interactions:action-".concat(n),t),"start"===n&&(this.prevEvent=a),this._fireEvent(a),this._scopeFire("interactions:after-action-".concat(n),t),!0}},{key:"_now",value:function(){return Date.now()}}]),t}();function Ie(t){Me(t.interaction)}function Me(t){if(!function(t){return!(!t.offset.pending.x&&!t.offset.pending.y)}(t))return!1;var e=t.offset.pending;return Ae(t.coords.cur,e),Ae(t.coords.delta,e),H(t.edges,t.rect,e),e.x=0,e.y=0,!0}function ze(t){var e=t.x,n=t.y;this.offset.pending.x+=e,this.offset.pending.y+=n,this.offset.total.x+=e,this.offset.total.y+=n}function Ae(t,e){var n=t.page,r=t.client,i=e.x,o=e.y;n.x+=i,n.y+=o,r.x+=i,r.y+=o}Oe.offsetBy="";var Re={id:"offset",before:["modifiers","pointer-events","actions","inertia"],install:function(t){t.Interaction.prototype.offsetBy=ze},listeners:{"interactions:new":function(t){t.interaction.offset={total:{x:0,y:0},pending:{x:0,y:0}}},"interactions:update-pointer":function(t){return function(t){t.pointerIsDown&&(Ae(t.coords.cur,t.offset.total),t.offset.pending.x=0,t.offset.pending.y=0)}(t.interaction)},"interactions:before-action-start":Ie,"interactions:before-action-move":Ie,"interactions:before-action-end":function(t){var e=t.interaction;if(Me(e))return e.move({offset:!0}),e.end(),!1},"interactions:stop":function(t){var e=t.interaction;e.offset.total.x=0,e.offset.total.y=0,e.offset.pending.x=0,e.offset.pending.y=0}}},Ce=Re;var je=function(){function t(e){r(this,t),this.active=!1,this.isModified=!1,this.smoothEnd=!1,this.allowResume=!1,this.modification=void 0,this.modifierCount=0,this.modifierArg=void 0,this.startCoords=void 0,this.t0=0,this.v0=0,this.te=0,this.targetOffset=void 0,this.modifiedOffset=void 0,this.currentOffset=void 0,this.lambda_v0=0,this.one_ve_v0=0,this.timeout=void 0,this.interaction=void 0,this.interaction=e}return o(t,[{key:"start",value:function(t){var e=this.interaction,n=Fe(e);if(!n||!n.enabled)return!1;var r=e.coords.velocity.client,i=Q(r.x,r.y),o=this.modification||(this.modification=new me(e));if(o.copyFrom(e.modification),this.t0=e._now(),this.allowResume=n.allowResume,this.v0=i,this.currentOffset={x:0,y:0},this.startCoords=e.coords.cur.page,this.modifierArg=o.fillArg({pageCoords:this.startCoords,preEnd:!0,phase:"inertiastart"}),this.t0-e.coords.cur.timeStamp<50&&i>n.minSpeed&&i>n.endSpeed)this.startInertia();else{if(o.result=o.setAll(this.modifierArg),!o.result.changed)return!1;this.startSmoothEnd()}return e.modification.result.rect=null,e.offsetBy(this.targetOffset),e._doPhase({interaction:e,event:t,phase:"inertiastart"}),e.offsetBy({x:-this.targetOffset.x,y:-this.targetOffset.y}),e.modification.result.rect=null,this.active=!0,e.simulation=this,!0}},{key:"startInertia",value:function(){var t=this,e=this.interaction.coords.velocity.client,n=Fe(this.interaction),r=n.resistance,i=-Math.log(n.endSpeed/this.v0)/r;this.targetOffset={x:(e.x-i)/r,y:(e.y-i)/r},this.te=i,this.lambda_v0=r/this.v0,this.one_ve_v0=1-n.endSpeed/this.v0;var o=this.modification,a=this.modifierArg;a.pageCoords={x:this.startCoords.x+this.targetOffset.x,y:this.startCoords.y+this.targetOffset.y},o.result=o.setAll(a),o.result.changed&&(this.isModified=!0,this.modifiedOffset={x:this.targetOffset.x+o.result.delta.x,y:this.targetOffset.y+o.result.delta.y}),this.onNextFrame((function(){return t.inertiaTick()}))}},{key:"startSmoothEnd",value:function(){var t=this;this.smoothEnd=!0,this.isModified=!0,this.targetOffset={x:this.modification.result.delta.x,y:this.modification.result.delta.y},this.onNextFrame((function(){return t.smoothEndTick()}))}},{key:"onNextFrame",value:function(t){var e=this;this.timeout=Lt.request((function(){e.active&&t()}))}},{key:"inertiaTick",value:function(){var t,e,n,r,i,o,a,s=this,c=this.interaction,l=Fe(c).resistance,u=(c._now()-this.t0)/1e3;if(u<this.te){var p,f=1-(Math.exp(-l*u)-this.lambda_v0)/this.one_ve_v0;this.isModified?(t=0,e=0,n=this.targetOffset.x,r=this.targetOffset.y,i=this.modifiedOffset.x,o=this.modifiedOffset.y,p={x:Ye(a=f,t,n,i),y:Ye(a,e,r,o)}):p={x:this.targetOffset.x*f,y:this.targetOffset.y*f};var d={x:p.x-this.currentOffset.x,y:p.y-this.currentOffset.y};this.currentOffset.x+=d.x,this.currentOffset.y+=d.y,c.offsetBy(d),c.move(),this.onNextFrame((function(){return s.inertiaTick()}))}else c.offsetBy({x:this.modifiedOffset.x-this.currentOffset.x,y:this.modifiedOffset.y-this.currentOffset.y}),this.end()}},{key:"smoothEndTick",value:function(){var t=this,e=this.interaction,n=e._now()-this.t0,r=Fe(e).smoothEndDuration;if(n<r){var i={x:Le(n,0,this.targetOffset.x,r),y:Le(n,0,this.targetOffset.y,r)},o={x:i.x-this.currentOffset.x,y:i.y-this.currentOffset.y};this.currentOffset.x+=o.x,this.currentOffset.y+=o.y,e.offsetBy(o),e.move({skipModifiers:this.modifierCount}),this.onNextFrame((function(){return t.smoothEndTick()}))}else e.offsetBy({x:this.targetOffset.x-this.currentOffset.x,y:this.targetOffset.y-this.currentOffset.y}),this.end()}},{key:"resume",value:function(t){var e=t.pointer,n=t.event,r=t.eventTarget,i=this.interaction;i.offsetBy({x:-this.currentOffset.x,y:-this.currentOffset.y}),i.updatePointer(e,n,r,!0),i._doPhase({interaction:i,event:n,phase:"resume"}),et(i.coords.prev,i.coords.cur),this.stop()}},{key:"end",value:function(){this.interaction.move(),this.interaction.end(),this.stop()}},{key:"stop",value:function(){this.active=this.smoothEnd=!1,this.interaction.simulation=null,Lt.cancel(this.timeout)}}]),t}();function Fe(t){var e=t.interactable,n=t.prepared;return e&&e.options&&n.name&&e.options[n.name].inertia}var Xe={id:"inertia",before:["modifiers","actions"],install:function(t){var e=t.defaults;t.usePlugin(Ce),t.usePlugin(Ee),t.actions.phases.inertiastart=!0,t.actions.phases.resume=!0,e.perAction.inertia={enabled:!1,resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,smoothEndDuration:300}},listeners:{"interactions:new":function(t){var e=t.interaction;e.inertia=new je(e)},"interactions:before-action-end":function(t){var e=t.interaction,n=t.event;return(!e._interacting||e.simulation||!e.inertia.start(n))&&null},"interactions:down":function(t){var e=t.interaction,n=t.eventTarget,r=e.inertia;if(r.active)for(var i=n;w.element(i);){if(i===e.element){r.resume(t);break}i=A(i)}},"interactions:stop":function(t){var e=t.interaction.inertia;e.active&&e.stop()},"interactions:before-action-resume":function(t){var e=t.interaction.modification;e.stop(t),e.start(t,t.interaction.coords.cur.page),e.applyToInteraction(t)},"interactions:before-action-inertiastart":function(t){return t.interaction.modification.setAndApply(t)},"interactions:action-resume":xe,"interactions:action-inertiastart":xe,"interactions:after-action-inertiastart":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-resume":function(t){return t.interaction.modification.restoreInteractionCoords(t)}}};function Ye(t,e,n,r){var i=1-t;return i*i*e+2*i*t*n+t*t*r}function Le(t,e,n,r){return-n*(t/=r)*(t-2)+e}var qe=Xe;function Be(t,e){for(var n=0;n<e.length;n++){var r=e[n];if(t.immediatePropagationStopped)break;r(t)}}var Ve=function(){function t(e){r(this,t),this.options=void 0,this.types={},this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.global=void 0,this.options=V({},e||{})}return o(t,[{key:"fire",value:function(t){var e,n=this.global;(e=this.types[t.type])&&Be(t,e),!t.propagationStopped&&n&&(e=n[t.type])&&Be(t,e)}},{key:"on",value:function(t,e){var n=$(t,e);for(t in n)this.types[t]=gt(this.types[t]||[],n[t])}},{key:"off",value:function(t,e){var n=$(t,e);for(t in n){var r=this.types[t];if(r&&r.length)for(var i=0,o=n[t];i<o.length;i++){var a=o[i],s=r.indexOf(a);-1!==s&&r.splice(s,1)}}}},{key:"getRect",value:function(t){return null}}]),t}();var We=function(){function t(e){r(this,t),this.currentTarget=void 0,this.originalEvent=void 0,this.type=void 0,this.originalEvent=e,tt(this,e)}return o(t,[{key:"preventOriginalDefault",value:function(){this.originalEvent.preventDefault()}},{key:"stopPropagation",value:function(){this.originalEvent.stopPropagation()}},{key:"stopImmediatePropagation",value:function(){this.originalEvent.stopImmediatePropagation()}}]),t}();function Ge(t){return w.object(t)?{capture:!!t.capture,passive:!!t.passive}:{capture:!!t,passive:!1}}function Ne(t,e){return t===e||("boolean"==typeof t?!!e.capture===t&&!1==!!e.passive:!!t.capture==!!e.capture&&!!t.passive==!!e.passive)}var Ue={id:"events",install:function(t){var e,n=[],r={},i=[],o={add:a,remove:s,addDelegate:function(t,e,n,o,s){var u=Ge(s);if(!r[n]){r[n]=[];for(var p=0;p<i.length;p++){var f=i[p];a(f,n,c),a(f,n,l,!0)}}var d=r[n],h=bt(d,(function(n){return n.selector===t&&n.context===e}));h||(h={selector:t,context:e,listeners:[]},d.push(h));h.listeners.push({func:o,options:u})},removeDelegate:function(t,e,n,i,o){var a,u=Ge(o),p=r[n],f=!1;if(!p)return;for(a=p.length-1;a>=0;a--){var d=p[a];if(d.selector===t&&d.context===e){for(var h=d.listeners,v=h.length-1;v>=0;v--){var g=h[v];if(g.func===i&&Ne(g.options,u)){h.splice(v,1),h.length||(p.splice(a,1),s(e,n,c),s(e,n,l,!0)),f=!0;break}}if(f)break}}},delegateListener:c,delegateUseCapture:l,delegatedEvents:r,documents:i,targets:n,supportsOptions:!1,supportsPassive:!1};function a(t,e,r,i){if(t.addEventListener){var a=Ge(i),s=bt(n,(function(e){return e.eventTarget===t}));s||(s={eventTarget:t,events:{}},n.push(s)),s.events[e]||(s.events[e]=[]),bt(s.events[e],(function(t){return t.func===r&&Ne(t.options,a)}))||(t.addEventListener(e,r,o.supportsOptions?a:a.capture),s.events[e].push({func:r,options:a}))}}function s(t,e,r,i){if(t.addEventListener&&t.removeEventListener){var a=yt(n,(function(e){return e.eventTarget===t})),c=n[a];if(c&&c.events)if("all"!==e){var l=!1,u=c.events[e];if(u){if("all"===r){for(var p=u.length-1;p>=0;p--){var f=u[p];s(t,e,f.func,f.options)}return}for(var d=Ge(i),h=0;h<u.length;h++){var v=u[h];if(v.func===r&&Ne(v.options,d)){t.removeEventListener(e,r,o.supportsOptions?d:d.capture),u.splice(h,1),0===u.length&&(delete c.events[e],l=!0);break}}}l&&!Object.keys(c.events).length&&n.splice(a,1)}else for(e in c.events)c.events.hasOwnProperty(e)&&s(t,e,"all")}}function c(t,e){for(var n=Ge(e),i=new We(t),o=r[t.type],a=ht(t)[0],s=a;w.element(s);){for(var c=0;c<o.length;c++){var l=o[c],u=l.selector,p=l.context;if(R(s,u)&&M(p,a)&&M(p,s)){var f=l.listeners;i.currentTarget=s;for(var d=0;d<f.length;d++){var h=f[d];Ne(h.options,n)&&h.func(i)}}}s=A(s)}}function l(t){return c(t,!0)}return null==(e=t.document)||e.createElement("div").addEventListener("test",null,{get capture(){return o.supportsOptions=!0},get passive(){return o.supportsPassive=!0}}),t.events=o,o}},He={methodOrder:["simulationResume","mouseOrPen","hasPointer","idle"],search:function(t){for(var e=0,n=He.methodOrder;e<n.length;e++){var r=n[e],i=He[r](t);if(i)return i}return null},simulationResume:function(t){var e=t.pointerType,n=t.eventType,r=t.eventTarget,i=t.scope;if(!/down|start/i.test(n))return null;for(var o=0,a=i.interactions.list;o<a.length;o++){var s=a[o],c=r;if(s.simulation&&s.simulation.allowResume&&s.pointerType===e)for(;c;){if(c===s.element)return s;c=A(c)}}return null},mouseOrPen:function(t){var e,n=t.pointerId,r=t.pointerType,i=t.eventType,o=t.scope;if("mouse"!==r&&"pen"!==r)return null;for(var a=0,s=o.interactions.list;a<s.length;a++){var c=s[a];if(c.pointerType===r){if(c.simulation&&!Ke(c,n))continue;if(c.interacting())return c;e||(e=c)}}if(e)return e;for(var l=0,u=o.interactions.list;l<u.length;l++){var p=u[l];if(!(p.pointerType!==r||/down/i.test(i)&&p.simulation))return p}return null},hasPointer:function(t){for(var e=t.pointerId,n=0,r=t.scope.interactions.list;n<r.length;n++){var i=r[n];if(Ke(i,e))return i}return null},idle:function(t){for(var e=t.pointerType,n=0,r=t.scope.interactions.list;n<r.length;n++){var i=r[n];if(1===i.pointers.length){var o=i.interactable;if(o&&(!o.options.gesture||!o.options.gesture.enabled))continue}else if(i.pointers.length>=2)continue;if(!i.interacting()&&e===i.pointerType)return i}return null}};function Ke(t,e){return t.pointers.some((function(t){return t.id===e}))}var $e=He,Je=["pointerDown","pointerMove","pointerUp","updatePointer","removePointer","windowBlur"];function Qe(t,e){return function(n){var r=e.interactions.list,i=dt(n),o=ht(n),a=o[0],s=o[1],c=[];if(/^touch/.test(n.type)){e.prevTouchTime=e.now();for(var l=0,u=n.changedTouches;l<u.length;l++){var p=u[l],f={pointer:p,pointerId:at(p),pointerType:i,eventType:n.type,eventTarget:a,curEventTarget:s,scope:e},d=Ze(f);c.push([f.pointer,f.eventTarget,f.curEventTarget,d])}}else{var h=!1;if(!I.supportsPointerEvent&&/mouse/.test(n.type)){for(var v=0;v<r.length&&!h;v++)h="mouse"!==r[v].pointerType&&r[v].pointerIsDown;h=h||e.now()-e.prevTouchTime<500||0===n.timeStamp}if(!h){var g={pointer:n,pointerId:at(n),pointerType:i,eventType:n.type,curEventTarget:s,eventTarget:a,scope:e},m=Ze(g);c.push([g.pointer,g.eventTarget,g.curEventTarget,m])}}for(var y=0;y<c.length;y++){var b=c[y],x=b[0],w=b[1],E=b[2];b[3][t](x,n,w,E)}}}function Ze(t){var e=t.pointerType,n=t.scope,r={interaction:$e.search(t),searchDetails:t};return n.fire("interactions:find",r),r.interaction||n.interactions.new({pointerType:e})}function tn(t,e){var n=t.doc,r=t.scope,i=t.options,o=r.interactions.docEvents,a=r.events,s=a[e];for(var c in r.browser.isIOS&&!i.events&&(i.events={passive:!1}),a.delegatedEvents)s(n,c,a.delegateListener),s(n,c,a.delegateUseCapture,!0);for(var l=i&&i.events,u=0;u<o.length;u++){var p=o[u];s(n,p.type,p.listener,l)}}var en={id:"core/interactions",install:function(t){for(var e={},n=0;n<Je.length;n++){var i=Je[n];e[i]=Qe(i,t)}var a,c=I.pEventTypes;function l(){for(var e=0,n=t.interactions.list;e<n.length;e++){var r=n[e];if(r.pointerIsDown&&"touch"===r.pointerType&&!r._interacting)for(var i=function(){var e=a[o];t.documents.some((function(t){return M(t.doc,e.downTarget)}))||r.removePointer(e.pointer,e.event)},o=0,a=r.pointers;o<a.length;o++)i()}}(a=k.PointerEvent?[{type:c.down,listener:l},{type:c.down,listener:e.pointerDown},{type:c.move,listener:e.pointerMove},{type:c.up,listener:e.pointerUp},{type:c.cancel,listener:e.pointerUp}]:[{type:"mousedown",listener:e.pointerDown},{type:"mousemove",listener:e.pointerMove},{type:"mouseup",listener:e.pointerUp},{type:"touchstart",listener:l},{type:"touchstart",listener:e.pointerDown},{type:"touchmove",listener:e.pointerMove},{type:"touchend",listener:e.pointerUp},{type:"touchcancel",listener:e.pointerUp}]).push({type:"blur",listener:function(e){for(var n=0,r=t.interactions.list;n<r.length;n++){r[n].documentBlur(e)}}}),t.prevTouchTime=0,t.Interaction=function(e){s(i,e);var n=p(i);function i(){return r(this,i),n.apply(this,arguments)}return o(i,[{key:"pointerMoveTolerance",get:function(){return t.interactions.pointerMoveTolerance},set:function(e){t.interactions.pointerMoveTolerance=e}},{key:"_now",value:function(){return t.now()}}]),i}(De),t.interactions={list:[],new:function(e){e.scopeFire=function(e,n){return t.fire(e,n)};var n=new t.Interaction(e);return t.interactions.list.push(n),n},listeners:e,docEvents:a,pointerMoveTolerance:1},t.usePlugin(he)},listeners:{"scope:add-document":function(t){return tn(t,"add")},"scope:remove-document":function(t){return tn(t,"remove")},"interactable:unset":function(t,e){for(var n=t.interactable,r=e.interactions.list.length-1;r>=0;r--){var i=e.interactions.list[r];i.interactable===n&&(i.stop(),e.fire("interactions:destroy",{interaction:i}),i.destroy(),e.interactions.list.length>2&&e.interactions.list.splice(r,1))}}},onDocSignal:tn,doOnInteractions:Qe,methodNames:Je},nn=en,rn=function(t){return t[t.On=0]="On",t[t.Off=1]="Off",t}(rn||{}),on=function(){function t(e,n,i,o){r(this,t),this.target=void 0,this.options=void 0,this._actions=void 0,this.events=new Ve,this._context=void 0,this._win=void 0,this._doc=void 0,this._scopeEvents=void 0,this._actions=n.actions,this.target=e,this._context=n.context||i,this._win=y(B(e)?this._context:e),this._doc=this._win.document,this._scopeEvents=o,this.set(n)}return o(t,[{key:"_defaults",get:function(){return{base:{},perAction:{},actions:{}}}},{key:"setOnEvents",value:function(t,e){return w.func(e.onstart)&&this.on("".concat(t,"start"),e.onstart),w.func(e.onmove)&&this.on("".concat(t,"move"),e.onmove),w.func(e.onend)&&this.on("".concat(t,"end"),e.onend),w.func(e.oninertiastart)&&this.on("".concat(t,"inertiastart"),e.oninertiastart),this}},{key:"updatePerActionListeners",value:function(t,e,n){var r,i=this,o=null==(r=this._actions.map[t])?void 0:r.filterEventType,a=function(t){return(null==o||o(t))&&ve(t,i._actions)};(w.array(e)||w.object(e))&&this._onOff(rn.Off,t,e,void 0,a),(w.array(n)||w.object(n))&&this._onOff(rn.On,t,n,void 0,a)}},{key:"setPerAction",value:function(t,e){var n=this._defaults;for(var r in e){var i=r,o=this.options[t],a=e[i];"listeners"===i&&this.updatePerActionListeners(t,o.listeners,a),w.array(a)?o[i]=mt(a):w.plainObject(a)?(o[i]=V(o[i]||{},ge(a)),w.object(n.perAction[i])&&"enabled"in n.perAction[i]&&(o[i].enabled=!1!==a.enabled)):w.bool(a)&&w.object(n.perAction[i])?o[i].enabled=a:o[i]=a}}},{key:"getRect",value:function(t){return t=t||(w.element(this.target)?this.target:null),w.string(this.target)&&(t=t||this._context.querySelector(this.target)),L(t)}},{key:"rectChecker",value:function(t){var e=this;return w.func(t)?(this.getRect=function(n){var r=V({},t.apply(e,n));return"width"in r||(r.width=r.right-r.left,r.height=r.bottom-r.top),r},this):null===t?(delete this.getRect,this):this.getRect}},{key:"_backCompatOption",value:function(t,e){if(B(e)||w.object(e)){for(var n in this.options[t]=e,this._actions.map)this.options[n][t]=e;return this}return this.options[t]}},{key:"origin",value:function(t){return this._backCompatOption("origin",t)}},{key:"deltaSource",value:function(t){return"page"===t||"client"===t?(this.options.deltaSource=t,this):this.options.deltaSource}},{key:"getAllElements",value:function(){var t=this.target;return w.string(t)?Array.from(this._context.querySelectorAll(t)):w.func(t)&&t.getAllElements?t.getAllElements():w.element(t)?[t]:[]}},{key:"context",value:function(){return this._context}},{key:"inContext",value:function(t){return this._context===t.ownerDocument||M(this._context,t)}},{key:"testIgnoreAllow",value:function(t,e,n){return!this.testIgnore(t.ignoreFrom,e,n)&&this.testAllow(t.allowFrom,e,n)}},{key:"testAllow",value:function(t,e,n){return!t||!!w.element(n)&&(w.string(t)?F(n,t,e):!!w.element(t)&&M(t,n))}},{key:"testIgnore",value:function(t,e,n){return!(!t||!w.element(n))&&(w.string(t)?F(n,t,e):!!w.element(t)&&M(t,n))}},{key:"fire",value:function(t){return this.events.fire(t),this}},{key:"_onOff",value:function(t,e,n,r,i){w.object(e)&&!w.array(e)&&(r=n,n=null);var o=$(e,n,i);for(var a in o){"wheel"===a&&(a=I.wheelEvent);for(var s=0,c=o[a];s<c.length;s++){var l=c[s];ve(a,this._actions)?this.events[t===rn.On?"on":"off"](a,l):w.string(this.target)?this._scopeEvents[t===rn.On?"addDelegate":"removeDelegate"](this.target,this._context,a,l,r):this._scopeEvents[t===rn.On?"add":"remove"](this.target,a,l,r)}}return this}},{key:"on",value:function(t,e,n){return this._onOff(rn.On,t,e,n)}},{key:"off",value:function(t,e,n){return this._onOff(rn.Off,t,e,n)}},{key:"set",value:function(t){var e=this._defaults;for(var n in w.object(t)||(t={}),this.options=ge(e.base),this._actions.methodDict){var r=n,i=this._actions.methodDict[r];this.options[r]={},this.setPerAction(r,V(V({},e.perAction),e.actions[r])),this[i](t[r])}for(var o in t)"getRect"!==o?w.func(this[o])&&this[o](t[o]):this.rectChecker(t.getRect);return this}},{key:"unset",value:function(){if(w.string(this.target))for(var t in this._scopeEvents.delegatedEvents)for(var e=this._scopeEvents.delegatedEvents[t],n=e.length-1;n>=0;n--){var r=e[n],i=r.selector,o=r.context,a=r.listeners;i===this.target&&o===this._context&&e.splice(n,1);for(var s=a.length-1;s>=0;s--)this._scopeEvents.removeDelegate(this.target,this._context,t,a[s][0],a[s][1])}else this._scopeEvents.remove(this.target,"all")}}]),t}(),an=function(){function t(e){var n=this;r(this,t),this.list=[],this.selectorMap={},this.scope=void 0,this.scope=e,e.addListeners({"interactable:unset":function(t){var e=t.interactable,r=e.target,i=w.string(r)?n.selectorMap[r]:r[n.scope.id],o=yt(i,(function(t){return t===e}));i.splice(o,1)}})}return o(t,[{key:"new",value:function(t,e){e=V(e||{},{actions:this.scope.actions});var n=new this.scope.Interactable(t,e,this.scope.document,this.scope.events);return this.scope.addDocument(n._doc),this.list.push(n),w.string(t)?(this.selectorMap[t]||(this.selectorMap[t]=[]),this.selectorMap[t].push(n)):(n.target[this.scope.id]||Object.defineProperty(t,this.scope.id,{value:[],configurable:!0}),t[this.scope.id].push(n)),this.scope.fire("interactable:new",{target:t,options:e,interactable:n,win:this.scope._win}),n}},{key:"getExisting",value:function(t,e){var n=e&&e.context||this.scope.document,r=w.string(t),i=r?this.selectorMap[t]:t[this.scope.id];if(i)return bt(i,(function(e){return e._context===n&&(r||e.inContext(t))}))}},{key:"forEachMatch",value:function(t,e){for(var n=0,r=this.list;n<r.length;n++){var i=r[n],o=void 0;if((w.string(i.target)?w.element(t)&&R(t,i.target):t===i.target)&&i.inContext(t)&&(o=e(i)),void 0!==o)return o}}}]),t}();var sn=function(){function t(){var e=this;r(this,t),this.id="__interact_scope_".concat(Math.floor(100*Math.random())),this.isInitialized=!1,this.listenerMaps=[],this.browser=I,this.defaults=ge(Te),this.Eventable=Ve,this.actions={map:{},phases:{start:!0,move:!0,end:!0},methodDict:{},phaselessTypes:{}},this.interactStatic=function(t){var e=function e(n,r){var i=t.interactables.getExisting(n,r);return i||((i=t.interactables.new(n,r)).events.global=e.globalEvents),i};return e.getPointerAverage=lt,e.getTouchBBox=ut,e.getTouchDistance=pt,e.getTouchAngle=ft,e.getElementRect=L,e.getElementClientRect=Y,e.matchesSelector=R,e.closest=z,e.globalEvents={},e.version="1.10.27",e.scope=t,e.use=function(t,e){return this.scope.usePlugin(t,e),this},e.isSet=function(t,e){return!!this.scope.interactables.get(t,e&&e.context)},e.on=Nt((function(t,e,n){if(w.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),w.array(t)){for(var r=0,i=t;r<i.length;r++){var o=i[r];this.on(o,e,n)}return this}if(w.object(t)){for(var a in t)this.on(a,t[a],e);return this}return ve(t,this.scope.actions)?this.globalEvents[t]?this.globalEvents[t].push(e):this.globalEvents[t]=[e]:this.scope.events.add(this.scope.document,t,e,{options:n}),this}),"The interact.on() method is being deprecated"),e.off=Nt((function(t,e,n){if(w.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),w.array(t)){for(var r=0,i=t;r<i.length;r++){var o=i[r];this.off(o,e,n)}return this}if(w.object(t)){for(var a in t)this.off(a,t[a],e);return this}var s;return ve(t,this.scope.actions)?t in this.globalEvents&&-1!==(s=this.globalEvents[t].indexOf(e))&&this.globalEvents[t].splice(s,1):this.scope.events.remove(this.scope.document,t,e,n),this}),"The interact.off() method is being deprecated"),e.debug=function(){return this.scope},e.supportsTouch=function(){return I.supportsTouch},e.supportsPointerEvent=function(){return I.supportsPointerEvent},e.stop=function(){for(var t=0,e=this.scope.interactions.list;t<e.length;t++)e[t].stop();return this},e.pointerMoveTolerance=function(t){return w.number(t)?(this.scope.interactions.pointerMoveTolerance=t,this):this.scope.interactions.pointerMoveTolerance},e.addDocument=function(t,e){this.scope.addDocument(t,e)},e.removeDocument=function(t){this.scope.removeDocument(t)},e}(this),this.InteractEvent=Se,this.Interactable=void 0,this.interactables=new an(this),this._win=void 0,this.document=void 0,this.window=void 0,this.documents=[],this._plugins={list:[],map:{}},this.onWindowUnload=function(t){return e.removeDocument(t.target)};var n=this;this.Interactable=function(t){s(i,t);var e=p(i);function i(){return r(this,i),e.apply(this,arguments)}return o(i,[{key:"_defaults",get:function(){return n.defaults}},{key:"set",value:function(t){return f(c(i.prototype),"set",this).call(this,t),n.fire("interactable:set",{options:t,interactable:this}),this}},{key:"unset",value:function(){f(c(i.prototype),"unset",this).call(this);var t=n.interactables.list.indexOf(this);t<0||(n.interactables.list.splice(t,1),n.fire("interactable:unset",{interactable:this}))}}]),i}(on)}return o(t,[{key:"addListeners",value:function(t,e){this.listenerMaps.push({id:e,map:t})}},{key:"fire",value:function(t,e){for(var n=0,r=this.listenerMaps;n<r.length;n++){var i=r[n].map[t];if(i&&!1===i(e,this,t))return!1}}},{key:"init",value:function(t){return this.isInitialized?this:function(t,e){t.isInitialized=!0,w.window(e)&&m(e);return k.init(e),I.init(e),Lt.init(e),t.window=e,t.document=e.document,t.usePlugin(nn),t.usePlugin(Ue),t}(this,t)}},{key:"pluginIsInstalled",value:function(t){var e=t.id;return e?!!this._plugins.map[e]:-1!==this._plugins.list.indexOf(t)}},{key:"usePlugin",value:function(t,e){if(!this.isInitialized)return this;if(this.pluginIsInstalled(t))return this;if(t.id&&(this._plugins.map[t.id]=t),this._plugins.list.push(t),t.install&&t.install(this,e),t.listeners&&t.before){for(var n=0,r=this.listenerMaps.length,i=t.before.reduce((function(t,e){return t[e]=!0,t[cn(e)]=!0,t}),{});n<r;n++){var o=this.listenerMaps[n].id;if(o&&(i[o]||i[cn(o)]))break}this.listenerMaps.splice(n,0,{id:t.id,map:t.listeners})}else t.listeners&&this.listenerMaps.push({id:t.id,map:t.listeners});return this}},{key:"addDocument",value:function(t,e){if(-1!==this.getDocIndex(t))return!1;var n=y(t);e=e?V({},e):{},this.documents.push({doc:t,options:e}),this.events.documents.push(t),t!==this.document&&this.events.add(n,"unload",this.onWindowUnload),this.fire("scope:add-document",{doc:t,window:n,scope:this,options:e})}},{key:"removeDocument",value:function(t){var e=this.getDocIndex(t),n=y(t),r=this.documents[e].options;this.events.remove(n,"unload",this.onWindowUnload),this.documents.splice(e,1),this.events.documents.splice(e,1),this.fire("scope:remove-document",{doc:t,window:n,scope:this,options:r})}},{key:"getDocIndex",value:function(t){for(var e=0;e<this.documents.length;e++)if(this.documents[e].doc===t)return e;return-1}},{key:"getDocOptions",value:function(t){var e=this.getDocIndex(t);return-1===e?null:this.documents[e].options}},{key:"now",value:function(){return(this.window.Date||Date).now()}}]),t}();function cn(t){return t&&t.replace(/\/.*$/,"")}var ln=new sn,un=ln.interactStatic,pn="undefined"!=typeof globalThis?globalThis:window;ln.init(pn);var fn=Object.freeze({__proto__:null,edgeTarget:function(){},elements:function(){},grid:function(t){var e=[["x","y"],["left","top"],["right","bottom"],["width","height"]].filter((function(e){var n=e[0],r=e[1];return n in t||r in t})),n=function(n,r){for(var i=t.range,o=t.limits,a=void 0===o?{left:-1/0,right:1/0,top:-1/0,bottom:1/0}:o,s=t.offset,c=void 0===s?{x:0,y:0}:s,l={range:i,grid:t,x:null,y:null},u=0;u<e.length;u++){var p=e[u],f=p[0],d=p[1],h=Math.round((n-c.x)/t[f]),v=Math.round((r-c.y)/t[d]);l[f]=Math.max(a.left,Math.min(a.right,h*t[f]+c.x)),l[d]=Math.max(a.top,Math.min(a.bottom,v*t[d]+c.y))}return l};return n.grid=t,n.coordFields=e,n}}),dn={id:"snappers",install:function(t){var e=t.interactStatic;e.snappers=V(e.snappers||{},fn),e.createSnapGrid=e.snappers.grid}},hn=dn,vn={start:function(t){var n=t.state,r=t.rect,i=t.edges,o=t.pageCoords,a=n.options,s=a.ratio,c=a.enabled,l=n.options,u=l.equalDelta,p=l.modifiers;"preserve"===s&&(s=r.width/r.height),n.startCoords=V({},o),n.startRect=V({},r),n.ratio=s,n.equalDelta=u;var f=n.linkedEdges={top:i.top||i.left&&!i.bottom,left:i.left||i.top&&!i.right,bottom:i.bottom||i.right&&!i.top,right:i.right||i.bottom&&!i.left};if(n.xIsPrimaryAxis=!(!i.left&&!i.right),n.equalDelta){var d=(f.left?1:-1)*(f.top?1:-1);n.edgeSign={x:d,y:d}}else n.edgeSign={x:f.left?-1:1,y:f.top?-1:1};if(!1!==c&&V(i,f),null!=p&&p.length){var h=new me(t.interaction);h.copyFrom(t.interaction.modification),h.prepareStates(p),n.subModification=h,h.startAll(e({},t))}},set:function(t){var n=t.state,r=t.rect,i=t.coords,o=n.linkedEdges,a=V({},i),s=n.equalDelta?gn:mn;if(V(t.edges,o),s(n,n.xIsPrimaryAxis,i,r),!n.subModification)return null;var c=V({},r);H(o,c,{x:i.x-a.x,y:i.y-a.y});var l=n.subModification.setAll(e(e({},t),{},{rect:c,edges:o,pageCoords:i,prevCoords:i,prevRect:c})),u=l.delta;l.changed&&(s(n,Math.abs(u.x)>Math.abs(u.y),l.coords,l.rect),V(i,l.coords));return l.eventProps},defaults:{ratio:"preserve",equalDelta:!1,modifiers:[],enabled:!1}};function gn(t,e,n){var r=t.startCoords,i=t.edgeSign;e?n.y=r.y+(n.x-r.x)*i.y:n.x=r.x+(n.y-r.y)*i.x}function mn(t,e,n,r){var i=t.startRect,o=t.startCoords,a=t.ratio,s=t.edgeSign;if(e){var c=r.width/a;n.y=o.y+(c-i.height)*s.y}else{var l=r.height*a;n.x=o.x+(l-i.width)*s.x}}var yn=be(vn,"aspectRatio"),bn=function(){};bn._defaults={};var xn=bn;function wn(t,e,n){return w.func(t)?G(t,e.interactable,e.element,[n.x,n.y,e]):G(t,e.interactable,e.element)}var En={start:function(t){var e=t.rect,n=t.startOffset,r=t.state,i=t.interaction,o=t.pageCoords,a=r.options,s=a.elementRect,c=V({left:0,top:0,right:0,bottom:0},a.offset||{});if(e&&s){var l=wn(a.restriction,i,o);if(l){var u=l.right-l.left-e.width,p=l.bottom-l.top-e.height;u<0&&(c.left+=u,c.right+=u),p<0&&(c.top+=p,c.bottom+=p)}c.left+=n.left-e.width*s.left,c.top+=n.top-e.height*s.top,c.right+=n.right-e.width*(1-s.right),c.bottom+=n.bottom-e.height*(1-s.bottom)}r.offset=c},set:function(t){var e=t.coords,n=t.interaction,r=t.state,i=r.options,o=r.offset,a=wn(i.restriction,n,e);if(a){var s=function(t){return!t||"left"in t&&"top"in t||((t=V({},t)).left=t.x||0,t.top=t.y||0,t.right=t.right||t.left+t.width,t.bottom=t.bottom||t.top+t.height),t}(a);e.x=Math.max(Math.min(s.right-o.right,e.x),s.left+o.left),e.y=Math.max(Math.min(s.bottom-o.bottom,e.y),s.top+o.top)}},defaults:{restriction:null,elementRect:null,offset:null,endOnly:!1,enabled:!1}},Tn=be(En,"restrict"),Sn={top:1/0,left:1/0,bottom:-1/0,right:-1/0},_n={top:-1/0,left:-1/0,bottom:1/0,right:1/0};function Pn(t,e){for(var n=0,r=["top","left","bottom","right"];n<r.length;n++){var i=r[n];i in t||(t[i]=e[i])}return t}var On={noInner:Sn,noOuter:_n,start:function(t){var e,n=t.interaction,r=t.startOffset,i=t.state,o=i.options;o&&(e=N(wn(o.offset,n,n.coords.start.page))),e=e||{x:0,y:0},i.offset={top:e.y+r.top,left:e.x+r.left,bottom:e.y-r.bottom,right:e.x-r.right}},set:function(t){var e=t.coords,n=t.edges,r=t.interaction,i=t.state,o=i.offset,a=i.options;if(n){var s=V({},e),c=wn(a.inner,r,s)||{},l=wn(a.outer,r,s)||{};Pn(c,Sn),Pn(l,_n),n.top?e.y=Math.min(Math.max(l.top+o.top,s.y),c.top+o.top):n.bottom&&(e.y=Math.max(Math.min(l.bottom+o.bottom,s.y),c.bottom+o.bottom)),n.left?e.x=Math.min(Math.max(l.left+o.left,s.x),c.left+o.left):n.right&&(e.x=Math.max(Math.min(l.right+o.right,s.x),c.right+o.right))}},defaults:{inner:null,outer:null,offset:null,endOnly:!1,enabled:!1}},kn=be(On,"restrictEdges"),Dn=V({get elementRect(){return{top:0,left:0,bottom:1,right:1}},set elementRect(t){}},En.defaults),In=be({start:En.start,set:En.set,defaults:Dn},"restrictRect"),Mn={width:-1/0,height:-1/0},zn={width:1/0,height:1/0};var An=be({start:function(t){return On.start(t)},set:function(t){var e=t.interaction,n=t.state,r=t.rect,i=t.edges,o=n.options;if(i){var a=U(wn(o.min,e,t.coords))||Mn,s=U(wn(o.max,e,t.coords))||zn;n.options={endOnly:o.endOnly,inner:V({},On.noInner),outer:V({},On.noOuter)},i.top?(n.options.inner.top=r.bottom-a.height,n.options.outer.top=r.bottom-s.height):i.bottom&&(n.options.inner.bottom=r.top+a.height,n.options.outer.bottom=r.top+s.height),i.left?(n.options.inner.left=r.right-a.width,n.options.outer.left=r.right-s.width):i.right&&(n.options.inner.right=r.left+a.width,n.options.outer.right=r.left+s.width),On.set(t),n.options=o}},defaults:{min:null,max:null,endOnly:!1,enabled:!1}},"restrictSize");var Rn={start:function(t){var e,n=t.interaction,r=t.interactable,i=t.element,o=t.rect,a=t.state,s=t.startOffset,c=a.options,l=c.offsetWithOrigin?function(t){var e=t.interaction.element,n=N(G(t.state.options.origin,null,null,[e])),r=n||K(t.interactable,e,t.interaction.prepared.name);return r}(t):{x:0,y:0};if("startCoords"===c.offset)e={x:n.coords.start.page.x,y:n.coords.start.page.y};else{var u=G(c.offset,r,i,[n]);(e=N(u)||{x:0,y:0}).x+=l.x,e.y+=l.y}var p=c.relativePoints;a.offsets=o&&p&&p.length?p.map((function(t,n){return{index:n,relativePoint:t,x:s.left-o.width*t.x+e.x,y:s.top-o.height*t.y+e.y}})):[{index:0,relativePoint:null,x:e.x,y:e.y}]},set:function(t){var e=t.interaction,n=t.coords,r=t.state,i=r.options,o=r.offsets,a=K(e.interactable,e.element,e.prepared.name),s=V({},n),c=[];i.offsetWithOrigin||(s.x-=a.x,s.y-=a.y);for(var l=0,u=o;l<u.length;l++)for(var p=u[l],f=s.x-p.x,d=s.y-p.y,h=0,v=i.targets.length;h<v;h++){var g=i.targets[h],m=void 0;(m=w.func(g)?g(f,d,e._proxy,p,h):g)&&c.push({x:(w.number(m.x)?m.x:f)+p.x,y:(w.number(m.y)?m.y:d)+p.y,range:w.number(m.range)?m.range:i.range,source:g,index:h,offset:p})}for(var y={target:null,inRange:!1,distance:0,range:0,delta:{x:0,y:0}},b=0;b<c.length;b++){var x=c[b],E=x.range,T=x.x-s.x,S=x.y-s.y,_=Q(T,S),P=_<=E;E===1/0&&y.inRange&&y.range!==1/0&&(P=!1),y.target&&!(P?y.inRange&&E!==1/0?_/E<y.distance/y.range:E===1/0&&y.range!==1/0||_<y.distance:!y.inRange&&_<y.distance)||(y.target=x,y.distance=_,y.range=E,y.inRange=P,y.delta.x=T,y.delta.y=S)}return y.inRange&&(n.x=y.target.x,n.y=y.target.y),r.closest=y,y},defaults:{range:1/0,targets:null,offset:null,offsetWithOrigin:!0,origin:null,relativePoints:null,endOnly:!1,enabled:!1}},Cn=be(Rn,"snap");var jn={start:function(t){var e=t.state,n=t.edges,r=e.options;if(!n)return null;t.state={options:{targets:null,relativePoints:[{x:n.left?0:1,y:n.top?0:1}],offset:r.offset||"self",origin:{x:0,y:0},range:r.range}},e.targetFields=e.targetFields||[["width","height"],["x","y"]],Rn.start(t),e.offsets=t.state.offsets,t.state=e},set:function(t){var e=t.interaction,n=t.state,r=t.coords,i=n.options,o=n.offsets,a={x:r.x-o[0].x,y:r.y-o[0].y};n.options=V({},i),n.options.targets=[];for(var s=0,c=i.targets||[];s<c.length;s++){var l=c[s],u=void 0;if(u=w.func(l)?l(a.x,a.y,e):l){for(var p=0,f=n.targetFields;p<f.length;p++){var d=f[p],h=d[0],v=d[1];if(h in u||v in u){u.x=u[h],u.y=u[v];break}}n.options.targets.push(u)}}var g=Rn.set(t);return n.options=i,g},defaults:{range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1}},Fn=be(jn,"snapSize");var Xn={aspectRatio:yn,restrictEdges:kn,restrict:Tn,restrictRect:In,restrictSize:An,snapEdges:be({start:function(t){var e=t.edges;return e?(t.state.targetFields=t.state.targetFields||[[e.left?"left":"right",e.top?"top":"bottom"]],jn.start(t)):null},set:jn.set,defaults:V(ge(jn.defaults),{targets:void 0,range:void 0,offset:{x:0,y:0}})},"snapEdges"),snap:Cn,snapSize:Fn,spring:xn,avoid:xn,transform:xn,rubberband:xn},Yn={id:"modifiers",install:function(t){var e=t.interactStatic;for(var n in t.usePlugin(Ee),t.usePlugin(hn),e.modifiers=Xn,Xn){var r=Xn[n],i=r._defaults,o=r._methods;i._methods=o,t.defaults.perAction[n]=i}}},Ln=Yn,qn=function(t){s(n,t);var e=p(n);function n(t,i,o,a,s,c){var l;if(r(this,n),tt(u(l=e.call(this,s)),o),o!==i&&tt(u(l),i),l.timeStamp=c,l.originalEvent=o,l.type=t,l.pointerId=at(i),l.pointerType=dt(i),l.target=a,l.currentTarget=null,"tap"===t){var p=s.getPointerIndex(i);l.dt=l.timeStamp-s.pointers[p].downTime;var f=l.timeStamp-s.tapTime;l.double=!!s.prevTap&&"doubletap"!==s.prevTap.type&&s.prevTap.target===l.target&&f<500}else"doubletap"===t&&(l.dt=i.timeStamp-s.tapTime,l.double=!0);return l}return o(n,[{key:"_subtractOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX-=e,this.pageY-=n,this.clientX-=e,this.clientY-=n,this}},{key:"_addOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX+=e,this.pageY+=n,this.clientX+=e,this.clientY+=n,this}},{key:"preventDefault",value:function(){this.originalEvent.preventDefault()}}]),n}(vt),Bn={id:"pointer-events/base",before:["inertia","modifiers","auto-start","actions"],install:function(t){t.pointerEvents=Bn,t.defaults.actions.pointerEvents=Bn.defaults,V(t.actions.phaselessTypes,Bn.types)},listeners:{"interactions:new":function(t){var e=t.interaction;e.prevTap=null,e.tapTime=0},"interactions:update-pointer":function(t){var e=t.down,n=t.pointerInfo;if(!e&&n.hold)return;n.hold={duration:1/0,timeout:null}},"interactions:move":function(t,e){var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget;t.duplicate||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&Gn(t),Vn({interaction:n,pointer:r,event:i,eventTarget:o,type:"move"},e))},"interactions:down":function(t,e){!function(t,e){for(var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget,a=t.pointerIndex,s=n.pointers[a].hold,c=q(o),l={interaction:n,pointer:r,event:i,eventTarget:o,type:"hold",targets:[],path:c,node:null},u=0;u<c.length;u++){var p=c[u];l.node=p,e.fire("pointerEvents:collect-targets",l)}if(!l.targets.length)return;for(var f=1/0,d=0,h=l.targets;d<h.length;d++){var v=h[d].eventable.options.holdDuration;v<f&&(f=v)}s.duration=f,s.timeout=setTimeout((function(){Vn({interaction:n,eventTarget:o,pointer:r,event:i,type:"hold"},e)}),f)}(t,e),Vn(t,e)},"interactions:up":function(t,e){Gn(t),Vn(t,e),function(t,e){var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget;n.pointerWasMoved||Vn({interaction:n,eventTarget:o,pointer:r,event:i,type:"tap"},e)}(t,e)},"interactions:cancel":function(t,e){Gn(t),Vn(t,e)}},PointerEvent:qn,fire:Vn,collectEventTargets:Wn,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function Vn(t,e){var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget,a=t.type,s=t.targets,c=void 0===s?Wn(t,e):s,l=new qn(a,r,i,o,n,e.now());e.fire("pointerEvents:new",{pointerEvent:l});for(var u={interaction:n,pointer:r,event:i,eventTarget:o,targets:c,type:a,pointerEvent:l},p=0;p<c.length;p++){var f=c[p];for(var d in f.props||{})l[d]=f.props[d];var h=K(f.eventable,f.node);if(l._subtractOrigin(h),l.eventable=f.eventable,l.currentTarget=f.node,f.eventable.fire(l),l._addOrigin(h),l.immediatePropagationStopped||l.propagationStopped&&p+1<c.length&&c[p+1].node!==l.currentTarget)break}if(e.fire("pointerEvents:fired",u),"tap"===a){var v=l.double?Vn({interaction:n,pointer:r,event:i,eventTarget:o,type:"doubletap"},e):l;n.prevTap=v,n.tapTime=v.timeStamp}return l}function Wn(t,e){var n=t.interaction,r=t.pointer,i=t.event,o=t.eventTarget,a=t.type,s=n.getPointerIndex(r),c=n.pointers[s];if("tap"===a&&(n.pointerWasMoved||!c||c.downTarget!==o))return[];for(var l=q(o),u={interaction:n,pointer:r,event:i,eventTarget:o,type:a,path:l,targets:[],node:null},p=0;p<l.length;p++){var f=l[p];u.node=f,e.fire("pointerEvents:collect-targets",u)}return"hold"===a&&(u.targets=u.targets.filter((function(t){var e,r;return t.eventable.options.holdDuration===(null==(e=n.pointers[s])||null==(r=e.hold)?void 0:r.duration)}))),u.targets}function Gn(t){var e=t.interaction,n=t.pointerIndex,r=e.pointers[n].hold;r&&r.timeout&&(clearTimeout(r.timeout),r.timeout=null)}var Nn=Object.freeze({__proto__:null,default:Bn});function Un(t){var e=t.interaction;e.holdIntervalHandle&&(clearInterval(e.holdIntervalHandle),e.holdIntervalHandle=null)}var Hn={id:"pointer-events/holdRepeat",install:function(t){t.usePlugin(Bn);var e=t.pointerEvents;e.defaults.holdRepeatInterval=0,e.types.holdrepeat=t.actions.phaselessTypes.holdrepeat=!0},listeners:["move","up","cancel","endall"].reduce((function(t,e){return t["pointerEvents:".concat(e)]=Un,t}),{"pointerEvents:new":function(t){var e=t.pointerEvent;"hold"===e.type&&(e.count=(e.count||0)+1)},"pointerEvents:fired":function(t,e){var n=t.interaction,r=t.pointerEvent,i=t.eventTarget,o=t.targets;if("hold"===r.type&&o.length){var a=o[0].eventable.options.holdRepeatInterval;a<=0||(n.holdIntervalHandle=setTimeout((function(){e.pointerEvents.fire({interaction:n,eventTarget:i,type:"hold",pointer:r,event:r},e)}),a))}}})},Kn=Hn;var $n={id:"pointer-events/interactableTargets",install:function(t){var e=t.Interactable;e.prototype.pointerEvents=function(t){return V(this.events.options,t),this};var n=e.prototype._backCompatOption;e.prototype._backCompatOption=function(t,e){var r=n.call(this,t,e);return r===this&&(this.events.options[t]=e),r}},listeners:{"pointerEvents:collect-targets":function(t,e){var n=t.targets,r=t.node,i=t.type,o=t.eventTarget;e.interactables.forEachMatch(r,(function(t){var e=t.events,a=e.options;e.types[i]&&e.types[i].length&&t.testIgnoreAllow(a,r,o)&&n.push({node:r,eventable:e,props:{interactable:t}})}))},"interactable:new":function(t){var e=t.interactable;e.events.getRect=function(t){return e.getRect(t)}},"interactable:set":function(t,e){var n=t.interactable,r=t.options;V(n.events.options,e.pointerEvents.defaults),V(n.events.options,r.pointerEvents||{})}}},Jn=$n,Qn={id:"pointer-events",install:function(t){t.usePlugin(Nn),t.usePlugin(Kn),t.usePlugin(Jn)}},Zn=Qn;var tr={id:"reflow",install:function(t){var e=t.Interactable;t.actions.phases.reflow=!0,e.prototype.reflow=function(e){return function(t,e,n){for(var r=t.getAllElements(),i=n.window.Promise,o=i?[]:null,a=function(){var a=r[s],c=t.getRect(a);if(!c)return 1;var l,u=bt(n.interactions.list,(function(n){return n.interacting()&&n.interactable===t&&n.element===a&&n.prepared.name===e.name}));if(u)u.move(),o&&(l=u._reflowPromise||new i((function(t){u._reflowResolve=t})));else{var p=U(c),f=function(t){return{coords:t,get page(){return this.coords.page},get client(){return this.coords.client},get timeStamp(){return this.coords.timeStamp},get pageX(){return this.coords.page.x},get pageY(){return this.coords.page.y},get clientX(){return this.coords.client.x},get clientY(){return this.coords.client.y},get pointerId(){return this.coords.pointerId},get target(){return this.coords.target},get type(){return this.coords.type},get pointerType(){return this.coords.pointerType},get buttons(){return this.coords.buttons},preventDefault:function(){}}}({page:{x:p.x,y:p.y},client:{x:p.x,y:p.y},timeStamp:n.now()});l=function(t,e,n,r,i){var o=t.interactions.new({pointerType:"reflow"}),a={interaction:o,event:i,pointer:i,eventTarget:n,phase:"reflow"};o.interactable=e,o.element=n,o.prevEvent=i,o.updatePointer(i,i,n,!0),nt(o.coords.delta),Ut(o.prepared,r),o._doPhase(a);var s=t.window,c=s.Promise,l=c?new c((function(t){o._reflowResolve=t})):void 0;o._reflowPromise=l,o.start(r,e,n),o._interacting?(o.move(a),o.end(i)):(o.stop(),o._reflowResolve());return o.removePointer(i,i),l}(n,t,a,e,f)}o&&o.push(l)},s=0;s<r.length&&!a();s++);return o&&i.all(o).then((function(){return t}))}(this,e,t)}},listeners:{"interactions:stop":function(t,e){var n=t.interaction;"reflow"===n.pointerType&&(n._reflowResolve&&n._reflowResolve(),function(t,e){t.splice(t.indexOf(e),1)}(e.interactions.list,n))}}},er=tr;if(un.use(he),un.use(Ce),un.use(Zn),un.use(qe),un.use(Ln),un.use(pe),un.use(Xt),un.use(Gt),un.use(er),un.default=un,"object"===("undefined"==typeof module?"undefined":n(module))&&module)try{module.exports=un}catch(t){}return un.default=un,un}));


},{}],36:[function(require,module,exports){
(function (global){(function (){
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global global, define, Symbol, Reflect, Promise, SuppressedError, Iterator */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __esDecorate;
var __runInitializers;
var __propKey;
var __setFunctionName;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __spreadArray;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __classPrivateFieldIn;
var __createBinding;
var __addDisposableResource;
var __disposeResources;
var __rewriteRelativeImportExtension;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

    __extends = function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __esDecorate = function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access) context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0) continue;
                if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                if (_ = accept(result.get)) descriptor.get = _;
                if (_ = accept(result.set)) descriptor.set = _;
                if (_ = accept(result.init)) initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field") initializers.unshift(_);
                else descriptor[key] = _;
            }
        }
        if (target) Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    };

    __runInitializers = function (thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    };

    __propKey = function (x) {
        return typeof x === "symbol" ? x : "".concat(x);
    };

    __setFunctionName = function (f, name, prefix) {
        if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };

    __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    /** @deprecated */
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    /** @deprecated */
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __spreadArray = function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
        function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
        function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };

    __classPrivateFieldIn = function (state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    };

    __addDisposableResource = function (env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
            var dispose, inner;
            if (async) {
                if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
                if (async) inner = dispose;
            }
            if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
            if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
            env.stack.push({ value: value, dispose: dispose, async: async });
        }
        else if (async) {
            env.stack.push({ async: true });
        }
        return value;
    };

    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    __disposeResources = function (env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };

    __rewriteRelativeImportExtension = function (path, preserveJsx) {
        if (typeof path === "string" && /^\.\.?\//.test(path)) {
            return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
                return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
            });
        }
        return path;
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__esDecorate", __esDecorate);
    exporter("__runInitializers", __runInitializers);
    exporter("__propKey", __propKey);
    exporter("__setFunctionName", __setFunctionName);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    exporter("__classPrivateFieldIn", __classPrivateFieldIn);
    exporter("__addDisposableResource", __addDisposableResource);
    exporter("__disposeResources", __disposeResources);
    exporter("__rewriteRelativeImportExtension", __rewriteRelativeImportExtension);
});

0 && (module.exports = {
    __extends: __extends,
    __assign: __assign,
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __esDecorate: __esDecorate,
    __runInitializers: __runInitializers,
    __propKey: __propKey,
    __setFunctionName: __setFunctionName,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __exportStar: __exportStar,
    __createBinding: __createBinding,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources,
    __rewriteRelativeImportExtension: __rewriteRelativeImportExtension,
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
