package gripe._90.refinedpolymorph;

import com.illusivesoulworks.polymorph.api.PolymorphApi;
import com.illusivesoulworks.polymorph.api.client.base.ITickingRecipesWidget;
import com.illusivesoulworks.polymorph.api.client.base.PersistentRecipesWidget;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridContainerMenu;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridScreen;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternType;
import gripe._90.refinedpolymorph.mixin.PatternGridMenuAccess;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.screens.inventory.AbstractContainerScreen;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.inventory.Slot;
import net.neoforged.neoforge.network.PacketDistributor;

public class GridRecipeWidget extends PersistentRecipesWidget implements ITickingRecipesWidget {
    private Slot outputSlot;
    private int lastMenuHeight;

    public GridRecipeWidget(AbstractContainerScreen<?> screen, Slot output) {
        super(screen);
        outputSlot = output;
    }

    @Override
    public Slot getOutputSlot() {
        return outputSlot;
    }

    @Override
    public void selectRecipe(ResourceLocation resourceLocation) {
        super.selectRecipe(resourceLocation);
        PolymorphApi.getInstance().getNetwork().sendPlayerRecipeSelectionC2S(resourceLocation);
        PacketDistributor.sendToServer(new GridRecipeSelectPayload(resourceLocation));
    }

    @Override
    public void tick() {
        if (containerScreen.getYSize() != lastMenuHeight || !outputSlot.isActive()) {
            Slot slot = RefinedPolymorphismClient.findActiveResultSlot(containerScreen);
            if (slot != null) {
                outputSlot = slot;
                resetWidgetOffsets();
            }
            lastMenuHeight = containerScreen.getYSize();
        }
        if (openButton != null && selectionWidget != null) {
            openButton.visible = showsCrafting() && selectionWidget.getOutputWidgets().size() > 1;
        }
    }

    @Override
    public void render(GuiGraphics guiGraphics, int mouseX, int mouseY, float renderPartialTicks) {
        if (showsCrafting()) {
            super.render(guiGraphics, mouseX, mouseY, renderPartialTicks);
        }
    }

    @Override
    public boolean mouseClicked(double mouseX, double mouseY, int button) {
        if (!showsCrafting()) {
            return false;
        }
        return super.mouseClicked(mouseX, mouseY, button);
    }

    private boolean showsCrafting() {
        if (containerScreen instanceof PatternGridScreen screen) {
            return ((PatternGridMenuAccess) screen.getMenu()).refinedpolymorph$getPatternType() == PatternType.CRAFTING;
        }
        return true;
    }
}
