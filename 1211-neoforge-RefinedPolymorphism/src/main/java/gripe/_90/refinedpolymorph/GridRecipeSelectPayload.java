package gripe._90.refinedpolymorph;

import com.illusivesoulworks.polymorph.api.PolymorphApi;
import com.illusivesoulworks.polymorph.api.common.capability.IBlockEntityRecipeData;
import com.illusivesoulworks.polymorph.api.common.capability.IPlayerRecipeData;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridContainerMenu;
import com.refinedmods.refinedstorage.common.grid.AbstractCraftingGridContainerMenu;
import com.refinedmods.refinedstorage.common.grid.CraftingGrid;
import gripe._90.refinedpolymorph.mixin.AbstractCraftingGridMenuAccess;
import gripe._90.refinedpolymorph.mixin.PatternGridMenuAccess;
import net.minecraft.network.RegistryFriendlyByteBuf;
import net.minecraft.network.codec.StreamCodec;
import net.minecraft.network.protocol.common.custom.CustomPacketPayload;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.item.crafting.CraftingRecipe;
import net.minecraft.world.item.crafting.RecipeHolder;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.neoforged.neoforge.network.event.RegisterPayloadHandlersEvent;

public record GridRecipeSelectPayload(ResourceLocation recipeId) implements CustomPacketPayload {
    public static final Type<GridRecipeSelectPayload> TYPE =
            new Type<>(ResourceLocation.fromNamespaceAndPath(RefinedPolymorphism.MOD_ID, "select_recipe"));
    public static final StreamCodec<RegistryFriendlyByteBuf, GridRecipeSelectPayload> STREAM_CODEC =
            StreamCodec.composite(ResourceLocation.STREAM_CODEC, GridRecipeSelectPayload::recipeId, GridRecipeSelectPayload::new);

    public static void register(RegisterPayloadHandlersEvent event) {
        event.registrar("1").playToServer(TYPE, STREAM_CODEC, (payload, context) -> context.enqueueWork(() -> {
            if (context.player() instanceof ServerPlayer player) {
                handle(player, payload.recipeId());
            }
        }));
    }

    private static void handle(ServerPlayer player, ResourceLocation recipeId) {
        RecipeHolder<?> recipe = player.level().getRecipeManager().byKey(recipeId).orElse(null);
        if (recipe == null || !(recipe.value() instanceof CraftingRecipe)) {
            return;
        }
        if (player.containerMenu instanceof AbstractCraftingGridContainerMenu craftingMenu) {
            CraftingGrid grid = ((AbstractCraftingGridMenuAccess) craftingMenu).refinedpolymorph$getCraftingGrid();
            if (grid instanceof BlockEntity blockEntity) {
                selectBlockEntity(blockEntity, recipe);
                return;
            }
            if (grid instanceof GridSelection selection) {
                IPlayerRecipeData data = PolymorphApi.getInstance().getPlayerRecipeData(player);
                if (data != null) {
                    data.selectRecipe(recipe);
                }
                selection.refinedpolymorph$refreshFromSelection();
            }
            return;
        }
        if (player.containerMenu instanceof PatternGridContainerMenu patternMenu) {
            selectBlockEntity(((PatternGridMenuAccess) patternMenu).refinedpolymorph$getPatternGrid(), recipe);
        }
    }

    private static void selectBlockEntity(BlockEntity blockEntity, RecipeHolder<?> recipe) {
        IBlockEntityRecipeData data = PolymorphApi.getInstance().getBlockEntityRecipeData(blockEntity);
        if (data != null) {
            data.selectRecipe(recipe);
        }
    }

    @Override
    public Type<? extends CustomPacketPayload> type() {
        return TYPE;
    }
}
