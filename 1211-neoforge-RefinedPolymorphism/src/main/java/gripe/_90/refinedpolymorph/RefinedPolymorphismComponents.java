package gripe._90.refinedpolymorph;

import net.minecraft.core.component.DataComponentType;
import java.util.function.UnaryOperator;
import net.minecraft.core.component.DataComponentType;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.neoforged.neoforge.registries.DeferredHolder;
import net.neoforged.neoforge.registries.DeferredRegister;

public final class RefinedPolymorphismComponents {
    public static final DeferredRegister<DataComponentType<?>> DATA_COMPONENTS =
            DeferredRegister.create(Registries.DATA_COMPONENT_TYPE, RefinedPolymorphism.MOD_ID);

    public static final DeferredHolder<DataComponentType<?>, DataComponentType<ResourceLocation>> RECIPE =
            DATA_COMPONENTS.register("polymorph_recipe", () -> component(builder -> builder
                    .persistent(ResourceLocation.CODEC)
                    .networkSynchronized(ResourceLocation.STREAM_CODEC)));

    private static <T> DataComponentType<T> component(UnaryOperator<DataComponentType.Builder<T>> operator) {
        return operator.apply(DataComponentType.builder()).build();
    }

    private RefinedPolymorphismComponents() {
    }
}
