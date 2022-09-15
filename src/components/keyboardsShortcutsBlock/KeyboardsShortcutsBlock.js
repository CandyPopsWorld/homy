import { keyboardShortcuts } from "../../utils/data/keyboardShortcuts";

const KeyboardsShortcutsBlock = () => {

    let elements_keyboardsShortcuts = keyboardShortcuts.map(item => {
        return (
            <div className="homy_settings_wrapper_nav_block_item_shortcuts_wrapper_shortcuts_block_list_item">
                <div className="homy_settings_wrapper_nav_block_item_shortcuts_wrapper_shortcuts_block_list_item_name">
                    {item.name}
                </div>
                <div className="homy_settings_wrapper_nav_block_item_shortcuts_wrapper_shortcuts_block_list_item_desription">
                    {item.description}
                </div>
            </div>
        )
    })

    return (
        <div className="homy_settings_wrapper_nav_block_item">
            <div className="homy_settings_wrapper_nav_block_item_header">
                <h2>Горячие клавиши</h2>
            </div>
            <div className="homy_settings_wrapper_nav_block_item_shortcuts_wrapper">
                <div className="homy_settings_wrapper_nav_block_item_shortcuts_wrapper_shortcuts_block">
                    <div className="homy_settings_wrapper_nav_block_item_shortcuts_wrapper_shortcuts_block_list">
                        {elements_keyboardsShortcuts}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default KeyboardsShortcutsBlock;